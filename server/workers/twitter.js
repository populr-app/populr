var keys = require('../../keys.js');
var Twitter = require('twitter');
var fs = require('fs-utils');
var People = require('../database/people.js');

People.findAll().then(function(data){

  data.forEach(function(person){
    console.log(person.get('fullName'));
  });
});

fs.readFile('../../data.json', function(err, data) {
  if (!err) {
   // console.log(JSON.parse(data).people);
  } else {
    Err(err);
  }
});

var client = new Twitter({
  consumer_key: keys.twitter.consumerKey,
  consumer_secret: keys.twitter.consumerSecret,
  access_token_key: keys.twitter.accessToken,
  access_token_secret: keys.twitter.accessTokenSecret
});

var params = {
  screen_name: 'katyperry'
};

client.get('users/show', params, function(error, tweets, response) {

  if (!error) {
    console.log(tweets.followers_count);
  } else {
    console.log(client);
    console.log(error);
  }
});
