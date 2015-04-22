var Promise = require('bluebird');
var request = Promise.promisify(require('request'));
var ig = require('instagram-node').instagram();
ig.use({
  client_id: "2f509754a0dd43c7b69b58be799b109d",
  client_secret: "f183313ea3ba4f449138ab62cb289ab7"
});

ig.use({access_token: 'b54ba21d52db43ac9167a368b600a8ae'})

ig.user_search('LOL', function(err, users, remaining, limit){
  console.log(users, remaining);
});

// request('https://api.instagram.com/v1/users/search?q=jack?client_id=2f509754a0dd43c7b69b58be799b109d').then(function(data){
//   console.log(data[0].body);
// })

// https://api.instagram.com/oauth/authorize/?client_id=2f509754a0dd43c7b69b58be799b109d&redirect_uri=http://populr.io&response_type=code
