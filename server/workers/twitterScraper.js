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
  return Twitter.findAll()
    .then(splitIntoChunks)
    .each(getAndUpdateTwitterData)
    .then(getMaxCounts)
    .then(calculateScores);
};

function splitIntoChunks(twitterData) {
  for (var i = 0; i < twitterData.length; i++) {
    twitterData[i] = twitterData[i].get();
  }

  return _.chunk(twitterData, 100);
}

function getAndUpdateTwitterData(chunk, i) {
  var sl = '[list ' + i + ']';
  var screenNames = _.pluck(chunk, 'handle').join();
  return getTwitterData(screenNames)
   .then(updateTwitterData(chunk, i));
}

function getTwitterData(screenNames) {
  return client.getAsync('users/lookup', {screen_name: screenNames});
}

function updateTwitterData(people, index) {
  return function(twitterData) {
    var sl = '[list ' + index + ']';
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
  return sql.query('SELECT MAX(followers) FROM twitters;').then(function(d1) {
    this.maxfollowers = Math.max(d1[0][0].max, 1);
    return sql.query('SELECT MAX(followerschange) FROM twitters;').then(function(d2) {
      this.maxfollowerschange = Math.max(d2[0][0].max, 1);
    });
  });
}

function calculateScores() {
  return Twitter.findAll().then(function(people) {
    var promiseArray = [];
    people.forEach(function(person) {
      person = person.get();
      var followers = (person.followers / this.maxfollowers) || 0;
      var followerschange = (person.followerschange / this.maxfollowerschange) || 0;
      var score = Math.floor(((followers + followerschange) / 2) * 1000);
      var scorechange = score - person.score;

      person.scorecounter++;

      if (person.scorecounter / 6 / 24 % 7 === 0 && person.scorecounter !== 0) {
        person.scoreweek.unshift(average(person.scoreday));
        if (person.scoreweek.length > 4) person.scoreweek.pop();
      }

      if (person.scorecounter / 6 % 24 === 0 && person.scorecounter !== 0) {
        person.scoreday.unshift(average(person.scorehour));
        if (person.scoreday.length > 7) person.scoreday.pop();
      }

      if (person.scorecounter % 6 === 0 && person.scorecounter !== 0) {
        person.scorehour.unshift(average(person.scoreminute));
        if (person.scorehour.length > 24) person.scorehour.pop();
      }

      person.scoreminute.unshift(score);
      if (person.scoreminute.length > 6) person.scoreminute.pop();

      var update = {
        fullName: person.fullName,
        twitter: {
          score: score,
          scorechange: scorechange,
          scorecounter: person.scorecounter,
          scoreminute: person.scoreminute,
          scorehour: person.scorehour,
          scoreday: person.scoreday,
          scoreweek: person.scoreweek,
          scoremonth: person.scoremonth
        }
      };
      promiseArray.push(TwitterController.add(update));
    });

    return Promise.all(promiseArray);
  });
}

function average(array, person) {
  return _.reduce(array, function(memo, num) {
    return memo + num;
  }, 0) / array.length;
}
