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
      chunk[i].followersperiodic.push(user.followers_count);
      var update = {
        fullName: chunk[i].fullName,
        twitter: {
          handle: user.screen_name,
          followers: user.followers_count,
          followerschange: user.followers_count - chunk[i].followers,
          followersperiodic: chunk[i].followersperiodic,
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
      var person = twitters[i].get();
      var f = person.followers / max.followers;
      var fc = person.followerschange / max.followerschange;
      if (isNaN(f)) f = 0;
      if (isNaN(fc)) fc = 0;
      var score = Math.floor(((f + fc) / 2) * 1000);
      person.scoreperiodic.push(score);
      var update = {
        fullName: person.fullName,
        twitter: {
          score: score,
          scorechange: score - person.score,
          scoreperiodic: person.scoreperiodic
        }
      };
      twitterPromises.push(TwitterController.add(update));
    }

    return Promise.all(twitterPromises);
  });
}
