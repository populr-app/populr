
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

module.exports = function() {
  FacebookDB.findAll()
   .then(splitIntoChunks)
   .then(getFacebookData);
};

function splitIntoChunks(people) {
  console.log('Splitting into chunks');
  for (var i = people.length - 1; i >= 0; i--) {
    people[i] = people[i].get();
  }

  return _.chunk(people, 3).slice(0, 2);
}

function getFacebookData(chunks) {
  var personPromises = [];
  chunks.forEach(function(chunk) {
    chunk.forEach(function(person) {
      personPromises.push(Promise.all(getPages(person)).then(updatePages(person)));
    });
  });

  return Promise.all(personPromises);
}

function getPages(person) {
  // iterate over pages and return promiseArray of page lookups
  var pagePromises = [];

  person.pages.forEach(function(page) {
    page = JSON.parse(page);
    pagePromises.push(FacebookApi.getAsync(page.id));

    // avoid rate-limiting by limiting requests to 1/sec
    Sleep.sleep(1);
  });

  return Promise.all(pagePromises);
}

function updatePages(person) {
  return function(pages) {
    var update = {
      fullName: person.fullName,
      facebook: {
        pages: []
      }
    };

    pages.forEach(function(page, index) {
      var oldPage = JSON.parse(person.pages[index]);
      var updatePage = {
        url: page.link,
        pageName: page.name,
        likes: page.likes,
        likesChange: page.likes - oldPage.likes,
        talkingAbout: page.talking_about_count,
        talkingAboutchange: page.talking_about_count - oldPage.talkingAbout,
        wereHere: page.were_here_count,
        wereHereChange: page.were_here_count - oldPage.wereHere,
        id: page.id
      };
      update.facebook.pages.push(JSON.stringify(updatePage));
    });

    return FacebookController.add(update);
  };
}
