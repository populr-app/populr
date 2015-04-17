
var _ = require('lodash');
var cheerio = require('cheerio');
var Promise = require('bluebird');
var log = require('../helpers/log');
var fs = Promise.promisifyAll(require('fs'));
var sql = require('../database/connection.js');
var Sites = require('../database/sites/model.js');
var People = require('../database/people/model.js');
var request = Promise.promisify(require('request'));
var SitesController = require('../database/sites/controller.js');
var PeopleController = require('../database/people/controller.js');

module.exports = function() {
  return requestHTML(require('../../data/sites.json').sites)
    .then(grabPeople)
    .then(countOccurences)
    .then(updatePeople)
    .then(getMaxs)
    .then(updateScores);
};

function requestHTML(sites) {
  var promiseArray = [];
  sites.forEach(function(site) {
    promiseArray.push(request(site).then(function(data) {
      var $ = cheerio.load(data[0].body);
      var text = $('body').text();
      text = text.replace(/\s+/g, ' ');
      text = text.replace(/[^\w\s]/gi, '');
      return text;
    }).catch(function(err) { log('${a}: Errored out [${b}]', 'scrapeSites'.cyan, site); }));
  });

  return Promise.all(promiseArray);
}

function grabPeople(html) {
  this.html = html.join(' ');
  return People.findAll().then(function(people) {
    var promiseArray = [];
    people.forEach(function(person) {
      promiseArray.push(SitesController
        .attachData(person.get())
        .then(function(data) {
          return {
            fullName: person.fullName,
            lastSiteCount: data.sites ? data.sites.count : 0,
            sites: {}
          };
        }));
    });

    return Promise.all(promiseArray);
  });
}

function countOccurences(people) {
  var html = this.html;
  people.forEach(function(person) {
    var count = occurrences(html, person.fullName);
    var countchange = count - person.lastSiteCount || 0;
    person.sites.count = occurrences(html, person.fullName);
    person.sites.countchange = countchange;
  });

  return people;
}

function updatePeople(people) {
  var promiseArray = [];
  people.forEach(function(person) {
    promiseArray.push(SitesController.add(person));
  });

  return Promise.all(promiseArray);
}

function getMaxs() {
  return sql.query('SELECT MAX(count) FROM sites;').then(function(d1) {
    this.maxcount = Math.max(d1[0][0].max, 1);
    return sql.query('SELECT MAX(countchange) FROM sites;').then(function(d2) {
      this.maxcountchange = Math.max(d2[0][0].max, 1);
    });
  });
}

function updateScores() {
  return Sites.findAll().then(function(people) {
    var promiseArray = [];
    people.forEach(function(person) {
      person = person.get();
      var count = (person.count / this.maxcount) || 0;
      var countchange = (person.countchange / this.maxcountchange) || 0;
      var score = Math.floor(((count + countchange) / 2) * 1000);
      var scorechange = score - person.score;

      person.scorecounter++;

      if (person.scorecounter / 6 / 24 % 7 === 0 && person.scorecounter !== 0) {
        person.scoreweek.unshift(average(person.scoreday));
        if (person.scoreweek.length > 4) person.scoreweek.pop();
      }

      if (person.scorecounter / 6 % 24 === 0 && person.scorecounter !== 0) {
        person.scoreday.unshift(average(person.scorehour));
        if (person.scoreday.length > 7) person.scoreday.pop();
      }

      if (person.scorecounter % 6 === 0 && person.scorecounter !== 0) {
        person.scorehour.unshift(average(person.scoreminute));
        if (person.scorehour.length > 24) person.scorehour.pop();
      }

      person.scoreminute.unshift(score);
      if (person.scoreminute.length > 6) person.scoreminute.pop();

      var update = {
        fullName: person.fullName,
        sites: {
          score: score,
          scorechange: scorechange,
          scorecounter: person.scorecounter,
          scoreminute: person.scoreminute,
          scorehour: person.scorehour,
          scoreday: person.scoreday,
          scoreweek: person.scoreweek,
          scoremonth: person.scoremonth
        }
      };
      promiseArray.push(SitesController.add(update));
    });

    return Promise.all(promiseArray);
  });
}

function average(array) {
  return _.reduce(array, function(memo, num) {
    return memo + num;
  }, 0) / array.length;
}

function occurrences(string, subString, allowOverlapping) {
  string += '';
  subString += '';
  if (subString.length <= 0) return string.length + 1;
  var n = 0;
  var pos = 0;
  var step = (allowOverlapping) ? 1 : subString.length;
  while (true) {
    pos = string.indexOf(subString, pos);
    if (pos >= 0) {
      n++;
      pos += step;
    } else break;
  }

  return (n);
}
