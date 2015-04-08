var TwitterApi = require('twitter');
var TwitterDB = require('../database/twitter/model.js');
var Populr = require('../database/twitter/controller.js');
var Utils = require('./utils.js');

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

    var handles = {};
    twitter.forEach(function(entry) {

      var obj = handles[entry.get('handle')] = [];
      obj[0] = entry.get('id');
      obj[1] = entry.get('followers');
      obj[2] = entry.get('score');

    });

    return handles;

  }).then(function(handles) {

    // Separate handles into 100-item string chunks
    var separated = Utils.separateArray(Object.keys(handles), 100);

    // Pings the Twitter API with 100 handles at a time
    separated.forEach(function(screenNames) {
      client.get('users/lookup', {'screen_name': screenNames.join()}, function(error, users, response) {
        console.log('Ping twitter API');
        if (!error) {
          users.forEach(function(user) {

            var handle = user.screen_name;
            var followers = user.followers_count;
            var profilePic = user.profile_image_url;
            var backgroundPic = user.profile_background_image_url;
            var id = handles[handle][0];
            var followersChange = followers - handles[handle][1];
            var score = followers + followersChange;
            var scoreChange = score - handles[handle][2];

            var update = {
              'id': id,
              'twitter': {
                'handle': handle,
                'profilePic': profilePic,
                'backgroundPic': backgroundPic,
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
};
