var cheerio = require('cheerio');
var Promise = require('bluebird');
var request = Promise.promisify(require('request'));
var Sequelize = require('Sequelize');
var sql = require('../database/connection.js');
var PeopleController = require('../database/people/controller.js');
var SitesController = require('../database/sites/controller.js');
var People = require('../database/people/model.js');
var Sites = require('../database/sites/model.js');
var fs = Promise.promisifyAll(require('fs'));
var log = require('../helpers/logger').log;

module.exports = function() {
  // Empties the siteData file and returns an array of sites
  log('SiteScraper: Starting up');
  return fs.writeFileAsync('./data/siteData.txt', '')
    .then(function() {
      log('SiteScraper: Cleared siteData.txt');
      log('SiteScraper: Starting requests');
      return require('../../data/sites.json').sites;
    }).each(function(site) {
      // Makes a request, filters, and appends each site's text to siteData.txt
      return request(site).then(function(data) {
        var $ = cheerio.load(data[0].body);
        var text = $('body').text();
        text = text.replace(/\s+/g, ' ');
        text = text.replace(/[^\w\s]/gi, '');
        log('SiteScraper: retrieved and writing to file ${a}', site);
        return fs.appendFileAsync('./data/siteData.txt', text);
      });
    }).then(function() {
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
      return fs.readFileAsync('./data/siteData.txt')
        .then(function(data) {
          var results = [];
          people.forEach(function(person) {
            var count = occurrences(data, person.fullName, false);
            var update = {
              fullName: person.fullName,
              sites: {
                count: count
              }
            };
            if (person.sites) update.sites.countchange = count - person.sites.count;
            results.push(SitesController.add(update));
          });

          return Promise.all(results);
        }).catch(function(err) {
          console.log(err);
        });
    }).then(function() {
      // Grabs the max count/change and gives it to the next method
      var max = {};
      return sql.query('SELECT MAX(count) FROM sites;').then(function(d1) {
        max.count = d1[0][0].max;
        return sql.query('SELECT MAX(countchange) FROM sites;').then(function(d2) {
          max.countchange = d2[0][0].max;
          log('SiteScraper: Max count: ${a}', max.count);
          log('SiteScraper: Max countchange: ${a}', max.countchange);
          return max;
        });
      });
    }).then(function(max) {
      // Grabs everyone in the sites db, calculates and updates their score
      return Sites.findAll().then(function(sites) {
          log('SiteScraper: Calculating and updating scores');
          var sitesPromises = [];
          for (var i = 0; i < sites.length; i++) {
            var c = sites[i].get('count') / max.count;
            var cc = sites[i].get('countchange') / max.countchange;
            if (isNaN(cc)) cc = 0;
            var score = (c + cc) / 2;
            sitesPromises.push(sites[i].update({score: Math.floor(score * 1000)}));
          }

          return Sequelize.Promise.all(sitesPromises);
        });
    }).then(function() {
      log('SiteScraper: Done!');
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
