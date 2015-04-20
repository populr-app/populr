
var FacebookApi = require('fbgraph');
var Promise = require('bluebird');
var FacebookDB = require('../database/facebook/model.js');
var FacebookController = require('../database/facebook/controller.js');
var keys = require('../../keys.js').facebook;

Promise.promisifyAll(FacebookApi);

// set auth credentials for Facebook Graph API
FacebookApi
  .setAccessToken(keys.accessToken)
  .setAppSecret(keys.appSecret);

//module.exports = function(){
FacebookDB.findAll()
 .then(getFacebookData);

//}

function getFacebookData(people) {

 // people.forEach(function(person) {
    var person = people[2];
    console.log(person.fullName);

    var promises = [];
    person.pages.forEach(function(page) {

      var t = JSON.parse(page);
      promises.push(FacebookApi.getAsync(t.id).then(updatePage(page)));

    })
  //});

  return Promise.all(promises);
}

function updatePage(p) {
  return function(facebookData) {
    console.log("NEW PAGE:", facebookData);
  }

}

// Query facebook table for people
// iterate over people
//  for each person, loop over pages
//    for each page, update to include the newest information from fb api
//    save person in facebook table

// var searchOptions = {
//   q:'Katy Perry',
//   type: 'page'
// };

// FacebookApi.get("1392443837682836", function(err, res) {
//     console.log(res); // { id: '4', name: 'Mark Zuckerberg'... }
//   });
  // .search(searchOptions, function(err, res) {
  //   console.log(graph.getAccessToken());
  //   console.log(res); // {data: [{id: xxx, from: ...}, {id: xxx, from: ...}]}
  // });
