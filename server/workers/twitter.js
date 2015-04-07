var TwitterApi = require('twitter');
var sleep = require('sleep');
var People = require('../database/people.js');
var Twitter = require('../database/twitter.js');
var keys = require('../../keys.js');

// Sets twitter credentials
var client = new TwitterApi({
  consumer_key: keys.twitter.consumerKey,
  consumer_secret: keys.twitter.consumerSecret,
  access_token_key: keys.twitter.accessToken,
  access_token_secret: keys.twitter.accessTokenSecret
});

// Queries People table
People.findAll().then(function(people) {

  // Initializes the final result object
  var result = {};
  result.people = [];

  // Gets the twitter handle and update the followers count
  people.forEach(function(person) {

    // Queries the Twitter table
    Twitter.find(person.get('id')).then(function(twitter){

      // Adds full name to new person object
      var newPerson = {'fullName': person.get('fullName')};

      // Pings the Twitter API
      client.get('users/show', {'screen_name': twitter.get('handle')}, function(error, tweets, response) {

        if (!error) {
          newPerson.twitter = {'followers': tweets.followers_count};
          result.people.push(newPerson);
          sleep.sleep(5); // wait for 5 seconds to avoid rate-limiting
        } else { console.log(error); }

      });
    });
  });


});
