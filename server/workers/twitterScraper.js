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

function updateTwitterData(people, index) {
  return function(twitterData) {
    log('${a}: Updating list ${b} users in database', 'Twitter Scraper', index);
    var updatePromises = [];
    for (var i = 0; i < twitterData[0].length; i++) {
      var user = twitterData[0][i];
      var person = people[i];
      if (person.tweets.length > 4) {
        person.tweets.pop();
      }

      person.tweets.unshift(JSON.stringify(user.status));
      var update = {
        fullName: person.fullName,
        twitter: {
          handle: user.screen_name,
          followers: user.followers_count,
          followerschange: user.followers_count - person.followers,
          tweets: person.tweets,
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
      var scorechange = score - person.score;

      person.scorecounter++;

      if (((person.scorecounter / 6) / 24) % 7 === 0) {
        person.scoreweek.unshift(average(person.scoreday));
        if (person.scoreweek.length > 6) person.scoreweek.pop();
      }

      if ((person.scorecounter / 6) % 24 === 0) {
        person.scoreday.unshift(average(person.scorehour));
        if (person.scoreday.length) person.scoreday.pop();
      }

      if (person.scorecounter % 6 === 0) {
        person.scorehour.unshift(average(person.scoreminute));
        if (person.scorehour.length) person.scorehour.pop();
      }

      person.scoreminute.unshift(score);
      if (person.scoreminute.length) person.scoreminute.pop();

      var update = {
        fullName: person.fullName,
        twitter: {
          score: score,
          scorechange: score - person.score,
          scorecounter: person.scorecounter,
          scorehour: person.scorehour,
          scoreday: person.scoreday,
          scoreweek: person.scoreweek,
          scoremonth: person.scoremonth
        }
      };
      twitterPromises.push(TwitterController.add(update));
    }

    return Promise.all(twitterPromises);
  });
}

function average(array, person) {
  return _.reduce(array, function(memo, num) {
    return memo + num;
  }, 0) / array.length;
}
