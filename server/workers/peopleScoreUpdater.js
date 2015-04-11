
var Promise = require('bluebird');
var PeopleController = require('../database/people/controller');
var twitterController = require('../database/twitter/controller');
var contextController = require('../database/context/controller');
var sitesController = require('../database/sites/controller');
var facebookController = require('../database/facebook/controller');
var topController = require('../database/top/controller');
var People = require('../database/people/model');

module.exports = function() {
  return People.findAll().then(function(data) {
    for (var i = 0; i < data.length; i++) {
      data[i] = data[i].get();
    }

    return data;
  }).then(function(people) {
    var dataPromises = [];
    people.forEach(function(person) {
      dataPromises.push(twitterController.attachData(person)
        .then(sitesController.attachData)
        .then(facebookController.attachData));
    });

    return Promise.all(dataPromises);
  }).then(function(people) {
    people.forEach(function(person) {
      var score = 0;
      var apis = 0;
      if (person.twitter) {
        score += person.twitter.score;
        apis++;
      }

      if (person.sites) {
        score += person.sites.score;
        apis++;
      }

      score = Math.floor(score / apis);
      var update = {
        fullName: person.fullName,
        scorechange: score - person.score,
        score: score
      };
      People.findOne({where: {fullName: update.fullName}}).then(function(foundPerson) {
        foundPerson.update(update);
      });
    });
  });
};
