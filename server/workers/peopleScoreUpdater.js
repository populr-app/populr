
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

      person.scorecounter++;

      if (person.counter / 6 / 24 % 7 === 0 && person.counter !== 0) {
        person.scoreweek.unshift(average(person.scoreday));
        if (person.scoreweek.length > 4) person.scoreweek.pop();
      }

      if (person.counter / 6 % 24 === 0 && person.counter !== 0) {
        person.scoreday.unshift(average(person.scorehour));
        if (person.scoreday.length > 7) person.scoreday.pop();
      }

      if (person.counter % 6 === 0 && person.counter !== 0) {
        person.scorehour.unshift(average(person.scoreminute));
        if (person.scorehour.length > 24) person.scorehour.pop();
      }

      person.scoreminute.unshift(score);
      if (person.scoreminute.length > 6) person.scoreminute.pop();

      var update = {
        fullName: person.fullName,
        score: score,
        scorechange: score - person.score,
        scorecounter: person.scorecounter,
        scoreminute: person.scoreminute,
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
