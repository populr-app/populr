
var FacebookApi = require('fbgraph');
var Promise = require('bluebird');
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
 .then(getFacebookData);

//}

function getFacebookData(people) {
  people.forEach(function(person) {

    var promises = [];
    person.pages.forEach(function(page) {

      var t = JSON.parse(page);
      promises.push(FacebookApi.getAsync(t.id).then(updatePage(page)));

      // avoid rate-limiting by limiting requests to 1/sec
      Sleep.sleep(1);

    });
  });

  return Promise.all(promises);
}

function updatePage(page) {
  return function(facebookData) {
    var update = {
      url: facebookData.link,
      pageName: facebookData.name,
      likes: facebookData.likes,
      talkingAbout: facebookData.talking_about_count,
      wereHere: facebookData.were_here_count,
      id: facebookData.id
    };
    console.log('update', update.pageName);
    FacebookController.add(update);

  };

}
