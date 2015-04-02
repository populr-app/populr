
var OAuth2 = require('OAuth').OAuth2;
var keys = require('../../keys.js');
var https = require('https');

var oauth2 = new OAuth2(keys.twitter.key, keys.twitter.secret, 'https://api.twitter.com/', null, 'oauth2/token', null);

oauth2.getOAuthAccessToken('', {grant_type: 'client_credentials'}, function (e, token) {

  var options = {
    hostname: 'api.twitter.com',
    path: '/1.1/trends/place.json?id=1',
    headers: {
      Authorization: 'Bearer ' + token
    }
  };

  https.get(options, function(result) {
    var buffer = '';
    result.setEncoding('utf8');
    result.on('data', function(data) {
      buffer += data;
    });

    result.on('end', function() {
      var tweetData = JSON.parse(buffer);
      console.log(tweetData[0].trends);
    });
  });
});
