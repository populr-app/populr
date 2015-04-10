var Sequelize = require('Sequelize');
var TwitterApi = require('twitter');
var TwitterDB = require('../database/twitter/model.js');
var Populr = require('../database/twitter/controller.js');
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

  // Queries the Twitter table and builds an object.
  // Keys are the twitter handles,
  // Values are an array of the ids, number of followers, and the twitter score.
  TwitterDB.findAll().then(function(twitter) {
    for (var i = 0; i < twitter.length; i++) {
      twitter[i] = twitter[i].get();
    }

    return twitter;
  }).then(function(allUsers) {
    var chunks = _.chunk(allUsers, 100);
    var chunkPromises = [];

    chunks.forEach(function(chunk) {
      var screenNames = _.pluck(chunk, 'handle');
      chunkPromises.push(client.getAsync('users/lookup', {screen_name: screenNames.join()})
        .then(function(data) {
          var peoplePromises = [];
          for (var i = 0; i < data.length; i++) {
            var twitterData = data[0][i];
            if (twitterData) {
              var update = {
                fullName: chunk[i].fullName,
                twitter: {
                  handle: twitterData.screen_name,
                  followers: twitterData.followers_count,
                  followersChange: twitterData.followers_count - chunk[i].followers,
                  profilePic: twitterData.profile_image_url,
                  backgroundPic: twitterData.profile_banner_url
                }
              };
              peoplePromises.push(Populr.add(update));
            }
          }

          return Sequelize.Promise.all(peoplePromises);
        }));
    });

    return Sequelize.Promise.all(chunkPromises);
  })
  .then(function(data) {
    data[0].forEach(function(person) {
      console.log(person.fullName);
    });
  });
};
