
var _ = require('lodash');
var cheerio = require('cheerio');
var Promise = require('bluebird');
var request2 = require('request');
var log = require('../helpers/log');
var FeedParser = require('feedparser');
var fs = Promise.promisifyAll(require('fs'));
var sql = require('../database/connection.js');
var Sites = require('../database/sites/model.js');
var People = require('../database/people/model.js');
var request = Promise.promisify(require('request'));
var SitesController = require('../database/sites/controller.js');
var PeopleController = require('../database/people/controller.js');

module.exports = function() {
  log('${a}: Starting up...', 'scrapeSites'.cyan);
  return requestHTML(require('../../data/sites.json').sites)
    .then(requestHeadlines)
    .then(sortHeadlines)
    .then(grabPeople)
    .then(countOccurences)
    .then(updatePeople)
    .then(getMaxs)
    .then(updateScores);
};

function requestHTML(sites) {
  var promiseArray = [];
  var i = 0;
  sites.forEach(function(site) {
    promiseArray.push(request(site).then(function(data) {
      if (i % Math.round(sites.length / 10) === 0) {
        var string = '[' + Math.round10(i / sites.length * 100, 1) + '%]';
        log('${a}: Scraping HTML ${b}', 'scrapeSites'.cyan, string.magenta);
      }

      i++;
      var $ = cheerio.load(data[0].body);
      var text = $('body').text();
      text = text.replace(/\s+/g, ' ');
      text = text.replace(/[^\w\s]/gi, '');
      return text;
    }).catch(function(err) { log('${a}: Errored out on ${b}', 'scrapeSites'.cyan, site.red); }));
  });

  return Promise.all(promiseArray);
}

function requestHeadlines(html) {
  this.html = html.join(' ');
  var sites = require('../../data/sites.json').headlines;
  var promiseArray = [];
  sites.forEach(function(url, i) {
    promiseArray.push(new Promise(function(resolve, reject) {
      var feedparser = new FeedParser();
      var results = [];
      request2(url)
        .on('response', function() {
          this.pipe(feedparser);
        });

      feedparser.on('error', function(error) {
        reject(error);
      });

      feedparser.on('readable', function() {
        var item;
        while (item = this.read()) {
          var headline = {
            title: item['rss:title']['#'],
            url: item.link,
            date: item.date
          };
          results.push(headline);
        }
        resolve(results);
      });
    }).catch(function(err) { console.log(err) }));
  });

  return Promise.all(promiseArray);
}

function sortHeadlines(headlines) {
  headlines = _.flattenDeep(headlines);
  headlines = headlines.sort(function(a, b) {
    return a.date - b.date;
  });

  this.headlines = headlines;
}

function grabPeople() {
  log('${a}: Grabbing list of names', 'scrapeSites'.cyan);
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
  var headlines = this.headlines;
  people.forEach(function(person, i) {
    if (i % Math.round(people.length / 10) === 0) {
      var string = '[' + Math.round10(i / people.length * 100, 1) + '%]';
      log('${a}: Counting occurences ${b}', 'scrapeSites'.cyan, string.magenta);
    }

    var count = occurrences(html, person.fullName);
    var countchange = count - person.lastSiteCount || 0;
    person.sites.count = occurrences(html, person.fullName);
    person.sites.countchange = countchange;
    person.sites.headlines = findHeadlines(person.fullName, headlines);
  });

  log('${a}: Counting occurences ${b}', 'scrapeSites'.cyan, '[100%]'.magenta);
  return people;
}

function findHeadlines(fullName, headlines) {
  var results = [];
  headlines.forEach(function(headline) {
    if (headline && headline.title && headline.title.indexOf(fullName) !== -1) {
      results.push(JSON.stringify(headline));
    }
  });

  return results;
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

function updatePeople(people) {
  var promiseArray = [];
  log('${a}: Updating site counts', 'scrapeSites'.cyan);
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
      var string = '(' + this.maxcount + '/' + this.maxcountchange + ')';
      log('${a}: Retrieved max values ${b}', 'scrapeSites'.cyan, string.magenta);
    });
  });
}

function updateScores() {
  return Sites.findAll().then(function(people) {
    log('${a}: Calculating & updating scores', 'scrapeSites'.cyan);
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
  }).then(function() { log('${a}: Done!', 'scrapeSites'.cyan); });
}

function average(array) {
  return _.reduce(array, function(memo, num) {
    return memo + num;
  }, 0) / array.length;
}

Math.round10 = function(value, exp) {
  return decimalAdjust('round', value, exp);
};

function decimalAdjust(type, value, exp) {
  if (typeof exp === 'undefined' || +exp === 0) {
    return Math[type](value);
  }

  value = +value;
  exp = +exp;
  if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
    return NaN;
  }

  value = value.toString().split('e');
  value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
  value = value.toString().split('e');
  return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
}
