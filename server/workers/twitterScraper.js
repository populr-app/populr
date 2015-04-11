var Sequelize = require('sequelize');
var TwitterApi = require('twitter');
var sql = require('../database/connection.js');
var Twitter = require('../database/twitter/model.js');
var TwitterController = require('../database/twitter/controller.js');
var Utils = require('./utils.js');
var _ = require('lodash');

Sequelize.Promise.promisifyAll(TwitterApi.prototype);

module.exports = function() {

  // Sets twitter credentials
  var client = new TwitterApi({
    consumer_key: process.env.TWITTER_CK || require('../../keys.js').twitter.consumerKey,
    consumer_secret: process.env.TWITTER_CS || require('../../keys.js').twitter.consumerSecret,
    access_token_key: process.env.TWITTER_AK || require('../../keys.js').twitter.accessToken,
    access_token_secret: process.env.TWITTER_AS || require('../../keys.js').twitter.accessTokenSecret
  });

  // Queries the twitter db, and returns chunks of 100 people
  return Twitter.findAll().then(function(twitter) {
    for (var i = 0; i < twitter.length; i++) {
      twitter[i] = twitter[i].get();
    }

    return _.chunk(twitter, 100);
  }).each(function(chunk) {
    // Grabs all the screennames from each chunk, and sends it to
    // Twitter's API which returns new data to update our db with
    var screenNames = _.pluck(chunk, 'handle');
    return client.getAsync('users/lookup', {screen_name: screenNames.join()})
      .then(function(data) {
        var promiseArray = [];
        for (var i = 0; i < data[0].length; i++) {
          var twitterData = data[0][i];
          if (twitterData) {
            var update = {
              fullName: chunk[i].fullName,
              twitter: {
                handle: twitterData.screen_name,
                followers: twitterData.followers_count,
                followerschange: twitterData.followers_count - chunk[i].followers,
                profilePic: twitterData.profile_image_url,
                backgroundPic: twitterData.profile_banner_url
              }
            };
            promiseArray.push(TwitterController.add(update));
          }
        }

        return Sequelize.Promise.all(promiseArray);
      });
  }).then(function() {
    // Grabs the max followers/change and gives it to the next method
    var max = {};
    return sql.query('SELECT MAX(followers) FROM twitters;').then(function(d1) {
      max.followers = d1[0][0].max;
      return sql.query('SELECT MAX(followerschange) FROM twitters;').then(function(d2) {
        max.followerschange = d2[0][0].max;
        return max;
      });
    });
  }).then(function(max) {
    // Grabs everyone in the twitter db, calculates and updates their score
    return Twitter.findAll().then(function(twitters) {
        var twitterPromises = [];
        for (var i = 0; i < twitters.length; i++) {
          var f = twitters[i].get('followers') / max.followers;
          var fc = twitters[i].get('followerschange') / max.followerschange;
          var score = (f + fc) / 2;
          twitterPromises.push(twitters[i].update({score: Math.floor(score * 1000)}));
        }

        return Sequelize.Promise.all(twitterPromises);
      });
  });
};
