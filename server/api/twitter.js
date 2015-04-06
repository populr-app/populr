
var OAuth2 = require('OAuth').OAuth2;
var keys = require('../../keys.js');
var https = require('https');
var http = require('http');

module.exports = function(){

  var oauth2 = new OAuth2(keys.twitter.key, keys.twitter.secret, 'https://api.twitter.com/', null, 'oauth2/token', null);

  oauth2.getOAuthAccessToken('', {grant_type: 'client_credentials'}, function (e, token) {

    var options = {
      hostname: 'api.twitter.com',
      path: '/1.1/users/show.json?screen_name=garrettjoecox',
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
        var me = {
          fullName: 'Garrett Cox',
          twitter: {}
        };
        me.twitter.handle = tweetData.screen_name;
        me.twitter.tcId = tweetData.id;
        me.twitter.followers = tweetData.followers_count;
        var postData = JSON.stringify({people:[me]});
        var options = {
          hostname: 'populr.herokuapp.com',
          port: 80,
          path: '/api/people',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Content-Length': postData.length
          }
        };
        var req = http.request(options, function(res) {
          console.log('STATUS: ' + res.statusCode);
          console.log('HEADERS: ' + JSON.stringify(res.headers));
          res.setEncoding('utf8');
          res.on('data', function (chunk) {
            console.log('BODY: ' + chunk);
          });
        });
        req.on('error', function(e) {
          console.log('problem with request: ' + e.message);
        });
        req.write(postData);
        req.end();
      });
    });
  });
};
