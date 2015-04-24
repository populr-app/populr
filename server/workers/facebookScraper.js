
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
    .each(getFacebookData)
    .then(getMaxCounts);
};

function augmentPeople(people) {
  for (var i = 0; i < people.length; i++) {
    people[i] = people[i].get();
  }

  return people.slice(0, 3);
}

function getFacebookData(person) {
  var promiseArray = [];
  person.pages.forEach(function(page) {
    page = JSON.parse(page);
    promiseArray.push(getPageData(page));
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
      var pageUpdate = {
        url: newPage.url,
        pageName: newPage.pageName,
        likes: newPage.likes,
        likeschange: newPage.likes - oldPage.likes,
        talkingAbout: newPage.talking_about_count,
        talkingAboutChange: newPage.talking_about_count - oldPage.talkingAbout,
        wereHere: newPage.were_here_count,
        wereHereChange: newPage.were_here_count - oldPage.wereHere
      };
      update.facebook.pages.push(pageUpdate);
    });

    return FacebookController.add(update);
  };
}

function getMaxCounts() {
  return sql.query('SELECT MAX(likes) FROM facebooks;').then(function(d1) {
    this.maxfollowers = Math.max(d1[0][0].max, 1);
    return sql.query('SELECT MAX(likeschange) FROM facebooks;').then(function(d2) {
      this.maxfollowerschange = Math.max(d2[0][0].max, 1);
      console.log(this.max);
    });
  });
}
