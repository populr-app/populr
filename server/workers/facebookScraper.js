
var _ = require('lodash');
var Sleep = require('sleep');
var Promise = require('bluebird');
var FacebookApi = require('fbgraph');
var keys = require('../../keys.js').facebook;
var sql = require('../database/connection.js');
var FacebookDB = require('../database/facebook/model.js');
var FacebookController = require('../database/facebook/controller.js');
Promise.promisifyAll(FacebookApi);

FacebookApi
  .setAccessToken(keys.accessToken)
  .setAppSecret(keys.appSecret);

module.exports = function() {
  return FacebookDB.findAll()
    .then(augmentPeople)
    .each(getFacebookData);
};

function augmentPeople(people) {
  for (var i = 0; i < people.length; i++) {
    people[i] = people[i].get();
  }

  return people;
}

function getFacebookData(person) {
  var promiseArray = [];
  person.pages.forEach(function(page) {
    var newPage = JSON.parse(page);
    promiseArray.push(getPageData(newPage));
    Sleep.sleep(1);
  });
  return Promise.all(promiseArray).then(updateUser(person));
}

function getPageData(page) {
  return FacebookApi.getAsync(page.id);
}

function updateUser(person) {
  return function(pages) {
    var update = {
      fullName: person.fullName,
      facebook: {
        pages: []
      }
    };
    pages.forEach(function(newPage, i) {
      var oldPage = JSON.parse(person.pages[i]);
      oldPage.talkingAboutPeriodic = oldPage.talkingAboutPeriodic || [];
      oldPage.talkingAboutPeriodic.push(newPage.talking_about_count - oldPage.talkingAbout);
      var pageUpdate = {
        id: oldPage.id,
        url: newPage.url,
        pageName: newPage.pageName,
        likes: newPage.likes,
        likesChange: newPage.likes - oldPage.likes,
        talkingAbout: newPage.talking_about_count,
        talkingAboutChange: newPage.talking_about_count - oldPage.talkingAbout,
        talkingAboutPeriodic: oldPage.talkingAboutPeriodic,
        wereHere: newPage.were_here_count,
        wereHereChange: newPage.were_here_count - oldPage.wereHere
      };
      update.facebook.pages.push(pageUpdate);
    });
    console.log(JSON.stringify(update));
    return FacebookController.add(update);
  };
}
