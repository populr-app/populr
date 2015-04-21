
var FacebookApi = require('fbgraph');
var Promise = require('bluebird');
var _ = require('lodash');
var FacebookDB = require('../database/facebook/model.js');
var FacebookController = require('../database/facebook/controller.js');
var keys = require('../../keys.js').facebook;
var Sleep = require('sleep');
Promise.promisifyAll(FacebookApi);

// set auth credentials for Facebook Graph API
FacebookApi
  .setAccessToken(keys.accessToken)
  .setAppSecret(keys.appSecret);

//module.exports = function(){
FacebookDB.findAll()
 .then(splitIntoChunks)
 .then(getFacebookData);

//}

function splitIntoChunks(people) {
  console.log('Splitting into chunks');
  for (var i = people.length - 1; i >= 0; i--) {
    people[i] = people[i].get();
  }

  return _.chunk(people, 100);
}

function getFacebookData(chunks) {
  var promises = [];
  chunks.forEach(function(chunk) {

    chunk.forEach(function(person) {

      person.pages.forEach(function(page) {

        var t = JSON.parse(page);
        promises.push(FacebookApi.getAsync(t.id).then(updatePage(page)));

        // avoid rate-limiting by limiting requests to 1/sec
        Sleep.sleep(1);

      });

    });
  });

  return Promise.all(promises);
}

function updatePage(page) {
  return function(facebookData) {
    if (facebookData.name) {
      var update = {
        url: facebookData.link,
        pageName: facebookData.name,
        likes: facebookData.likes,
        talkingAbout: facebookData.talking_about_count,
        wereHere: facebookData.were_here_count,
        id: facebookData.id
      };
      console.log('update', update.pageName);
    }

  };

}
