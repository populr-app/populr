var _ = require('lodash');
var Promise = require('bluebird');
var log = require('../helpers/log');
var TwitterApi = require('twitter');
var sql = require('../database/connection.js');
var Twitter = require('../database/twitter/model.js');
var TwitterController = require('../database/twitter/controller.js');

Promise.promisifyAll(TwitterApi.prototype);

var client = new TwitterApi({
  consumer_key: process.env.TWITTER_CK || require('../../keys.js').twitter.consumerKey,
  consumer_secret: process.env.TWITTER_CS || require('../../keys.js').twitter.consumerSecret,
  access_token_key: process.env.TWITTER_AK || require('../../keys.js').twitter.accessToken,
  access_token_secret: process.env.TWITTER_AS || require('../../keys.js').twitter.accessTokenSecret
});

module.exports = function() {
  log('${a}: Starting', 'Twitter Scraper');
  return Twitter.findAll()
    .then(splitIntoChunks)
    .each(getAndUpdateTwitterData)
    .then(getMaxCounts)
    .then(calculateScores);
};

function splitIntoChunks(twitterData) {
  log('${a}: Splitting list into chunks', 'Twitter Scraper');
  for (var i = 0; i < twitterData.length; i++) {
    twitterData[i] = twitterData[i].get();
  }

  return _.chunk(twitterData, 100);
}

function getAndUpdateTwitterData(chunk, i) {
  log('${a}: Sending list ${b} users to twitter', 'Twitter Scraper', i);
  var screenNames = _.pluck(chunk, 'handle').join();
  return getTwitterData(screenNames)
   .then(updateTwitterData(chunk, i));
}

function getTwitterData(screenNames) {
  return client.getAsync('users/lookup', {screen_name: screenNames});
}

function updateTwitterData(chunk, index) {
  return function(twitterData) {
    log('${a}: Updating list ${b} users in database', 'Twitter Scraper', index);
    var updatePromises = [];
    for (var i = 0; i < twitterData[0].length; i++) {
      var user = twitterData[0][i];
      var update = {
        fullName: chunk[i].fullName,
        twitter: {
          handle: user.screen_name,
          followers: user.followers_count,
          followerschange: user.followers_count - chunk[i].followers,
          profilePic: user.profile_image_url,
          backgroundPic: user.profile_banner_url
        }
      };
      updatePromises.push(TwitterController.add(update));
    }

    return Promise.all(updatePromises);
  };
}

function getMaxCounts() {
  log('${a}: Getting max followers/followerschange', 'Twitter Scraper');
  var max = {};
  return sql.query('SELECT MAX(followers) FROM twitters;').then(function(d1) {
    max.followers = d1[0][0].max;
    return sql.query('SELECT MAX(followerschange) FROM twitters;').then(function(d2) {
      max.followerschange = d2[0][0].max;
      return max;
    });
  });
}

function calculateScores(max) {
  return Twitter.findAll().then(function(twitters) {
    log('${a}: Calculating scores and updating users', 'Twitter Scraper');
    var twitterPromises = [];
    for (var i = 0; i < twitters.length; i++) {
      var f = twitters[i].get('followers') / max.followers;
      var fc = twitters[i].get('followerschange') / max.followerschange;
      var score = (f + fc) / 2;
      twitterPromises.push(twitters[i].update({score: Math.floor(score * 1000)}));
    }

    return Promise.all(twitterPromises);
  });
}
