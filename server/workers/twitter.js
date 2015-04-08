var TwitterApi = require('twitter');
var Sleep = require('sleep');
var TwitterDB = require('../database/twitter/model.js');
var Populr = require('../database/twitter/controller.js');
var Utils = require('./utils.js');
var keys = require('../../keys.js');

// Sets twitter credentials
var client = new TwitterApi({
  consumer_key: keys.twitter.consumerKey,
  consumer_secret: keys.twitter.consumerSecret,
  access_token_key: keys.twitter.accessToken,
  access_token_secret: keys.twitter.accessTokenSecret
});

// Queries the Twitter table and builds an object.
// Keys are the twitter handles,
// Values are an array of the ids, number of followers, and the twitter score.
TwitterDB.findAll().then(function(twitter) {

  var handles = {};
  twitter.forEach(function(entry) {

    var id = handles[entry.get('handle')] = [];
    id.push(entry.get('id'));
    id.push(entry.get('followers'));
    id.push(entry.get('score'));

  });

  return handles;

}).then(function(handles) {

  // Separate handles into 100-item string chunks
  var separated = Utils.separateArray(Object.keys(handles), 100);

  // Pings the Twitter API with 100 handles at a time
  separated.forEach(function(screenNames) {

    client.get('users/lookup', {'screen_name': screenNames.join()}, function(error, users, response) {

      if (!error) {
        users.forEach(function(user) {

          var id = handles[user.screen_name][0];
          var handle = user.screen_name;
          var followers = user.followers_count;
          var followersChange = followers - handles[handle][1];
          var score = followers + followersChange;
          var scoreChange = score - handles[handle][2];

          var update = {
            'id': id,
            'twitter': {
              'handle': handle,
              'followers': followers,
              'followersChange': followersChange,
              'score': score,
              'scoreChange': scoreChange
            }
          };

          // Sends update object to Twitter table
          Populr.add(update);

        });
      }else { console.log(error); }

    });
  });
});
