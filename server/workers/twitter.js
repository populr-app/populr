var TwitterApi = require('twitter');
var sleep = require('sleep');
var PeopleDB = require('../database/people.js');
var TwitterDB = require('../database/twitter.js');
var keys = require('../../keys.js');
var Populr = require('../people/peopleController.js');

// Sets twitter credentials
var client = new TwitterApi({
  consumer_key: keys.twitter.consumerKey,
  consumer_secret: keys.twitter.consumerSecret,
  access_token_key: keys.twitter.accessToken,
  access_token_secret: keys.twitter.accessTokenSecret
});

// Queries People table
PeopleDB.findAll().then(function(people) {

  // Initializes the final result object
  var result = {};
  result.people = [];

  // Gets the twitter handle and update the followers count
  people.forEach(function(person) {

    // Queries the Twitter table
    TwitterDB.find(person.get('id')).then(function(twitter){

      // Adds full name to new person object
      var newPerson = {'fullName': person.get('fullName')};

      // Pings the Twitter API
      client.get('users/show', {'screen_name': twitter.get('handle')}, function(error, tweets, response) {

        if (!error) {
          newPerson.twitter = {};
          newPerson.twitter.followers = tweets.followers_count;
          newPerson.twitter.followersChange =  tweets.followers_count - twitter.get('followers') ;
          result.people.push(newPerson);
          console.log(JSON.stringify(result));
          sleep.sleep(5); // wait for 5 seconds to avoid rate-limiting
        } else { console.log(error); }

      });
    });
  });

});
