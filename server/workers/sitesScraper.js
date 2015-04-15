var cheerio = require('cheerio');
var Promise = require('bluebird');
var request = Promise.promisify(require('request'));
var Sequelize = require('sequelize');
var sql = require('../database/connection.js');
var PeopleController = require('../database/people/controller.js');
var SitesController = require('../database/sites/controller.js');
var People = require('../database/people/model.js');
var Sites = require('../database/sites/model.js');
var fs = Promise.promisifyAll(require('fs'));
var log = require('../helpers/log');
var _ = require('lodash');

module.exports = function() {
  log('${a}: Starting', 'Sites Scraper');
  // Empties the siteData file and returns an array of sites
  return fs.writeFileAsync('./data/siteData.txt', '')
    .then(function() {
      return require('../../data/sites.json').sites;
    }).each(function(site, index) {
      if (index % 10 === 0) log('${a}: Reading and writing... [${b}%]', 'Sites Scraper', Math.floor(index / 201 * 100));
      // Makes a request, filters, and appends each site's text to siteData.txt
      return request(site).then(function(data) {
        var $ = cheerio.load(data[0].body);
        var text = $('body').text();
        text = text.replace(/\s+/g, ' ');
        text = text.replace(/[^\w\s]/gi, '');
        return fs.appendFileAsync('./data/siteData.txt', text);
      });
    }).then(function() {
      log('${a}: Reading and writing... [100%]', 'Sites Scraper');
      // Returns a list of everyone and attaches their current site data if any
      return People.findAll().then(function(data) {
        var results = [];
        for (var i = 0; i < data.length; i++) {
          results.push(SitesController.attachData(data[i].get()));
        }

        return Promise.all(results);
      });
    }).then(function(people) {
      // Reads the siteData and for each person checks the occurences,
      // then makes a new update obj and sends it to the controller
      log('${a}: Reading text file', 'Sites Scraper');
      return fs.readFileAsync('./data/siteData.txt')
        .then(function(data) {
          var results = [];
          log('${a}: Counting occurrences', 'Sites Scraper');
          people.forEach(function(person) {
            var count = occurrences(data, person.fullName, false);
            var update = {
              fullName: person.fullName,
              sites: {
                count: count
              }
            };
            if (person.sites) {
              update.sites.countchange = count - person.sites.count;
            }

            results.push(SitesController.add(update));
          });

          return Promise.all(results);
        }).catch(function(err) {
          console.log(err);
        });
    }).then(function() {
      log('${a}: Done! emptying text file', 'Sites Scraper');
      return fs.writeFileAsync('./data/siteData.txt', '');
    }).then(function() {
      log('${a}: Getting max followers/followerschange', 'Sites Scraper');
      // Grabs the max count/change and gives it to the next method
      var max = {};
      return sql.query('SELECT MAX(count) FROM sites;').then(function(d1) {
        max.count = d1[0][0].max;
        return sql.query('SELECT MAX(countchange) FROM sites;').then(function(d2) {
          max.countchange = d2[0][0].max;
          return max;
        });
      });
    }).then(function(max) {
      // Grabs everyone in the sites db, calculates and updates their score
      return Sites.findAll().then(function(sites) {
          log('${a}: Calculating scores and updating users', 'Sites Scraper');
          var sitesPromises = [];
          for (var i = 0; i < sites.length; i++) {
            var person = sites[i].get();
            var c = person.count / max.count;
            var cc = person.countchange / max.countchange;
            if (isNaN(c)) c = 0;
            if (isNaN(cc)) cc = 0;
            var score = Math.floor(((c + cc) / 2) * 1000);
            var scorechange = score - person.score;

            person.scorecounter++;

            if (((person.scorecounter / 6) / 24) % 7 === 0) {
              person.scoreweek.unshift(average(person.scoreday));
              if (person.scoreweek.length > 6) person.scoreweek.pop();
            }

            if ((person.scorecounter / 6) % 24 === 0) {
              person.scoreday.unshift(average(person.scorehour));
              if (person.scoreday.length) person.scoreday.pop();
            }

            if (person.scorecounter % 6 === 0) {
              person.scorehour.unshift(average(person.scoreminute));
              if (person.scorehour.length) person.scorehour.pop();
            }

            person.scoreminute.unshift(score);
            if (person.scoreminute.length) person.scoreminute.pop();

            var update = {
              fullName: person.fullName,
              sites: {
                score: score,
                scorechange: score - person.score,
                scorecounter: person.scorecounter,
                scorehour: person.scorehour,
                scoreday: person.scoreday,
                scoreweek: person.scoreweek,
                scoremonth: person.scoremonth
              }
            };
            sitesPromises.push(SitesController.add(update));
          }

          return Sequelize.Promise.all(sitesPromises);
        });
    }).then(function() {
    });
};

// code borrowed from: http://stackoverflow.com/questions/4009756/how-to-count-string-occurrence-in-string
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

function average(array, person) {
  return _.reduce(array, function(memo, num) {
    return memo + num;
  }, 0) / array.length;
}
