
var Promise = require('bluebird');
var PeopleController = require('../database/people/controller');
var twitterController = require('../database/twitter/controller');
var contextController = require('../database/context/controller');
var sitesController = require('../database/sites/controller');
var facebookController = require('../database/facebook/controller');
var topController = require('../database/top/controller');
var People = require('../database/people/model');
var _ = require('lodash');

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
      var scorechange = score - person.score;

      if (person.scoremonth.length > 3) {
        person.scoremonth.pop();
      }

      if (person.scoreweek.length > 6) {
        person.scoremonth.unshift(average(person.scoreweek));
        person.scoreweek.pop();
      }

      if (person.scoreday.length > 23) {
        person.scoreweek.unshift(average(person.scoreday));
        person.scoreday.pop();
      }

      if (person.scorehour.length > 5) {
        person.scoreday.unshift(average(person.scorehour));
        person.scorehour.pop();
      }

      person.scorehour.unshift(score);

      var update = {
        fullName: person.fullName,
        score: score,
        scorechange: score - person.score,
        scorehour: person.scorehour,
        scoreday: person.scoreday,
        scoreweek: person.scoreweek,
        scoremonth: person.scoremonth
      };
      People.findOne({where: {fullName: update.fullName}}).then(function(foundPerson) {
        foundPerson.update(update);
      });
    });
  });
};


function average(array, person) {
  return _.reduce(array, function(memo, num) {
    return memo + num;
  }, 0) / array.length;
}