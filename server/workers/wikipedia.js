var WikipediaApi = require('wtf_wikipedia');
var CronJob = require('cron').CronJob;
var PeopleDB = require('../database/people/model.js');
var WikipediaDB = require('../database/wikipedia/model.js');
var Populr = require('../database/wikipedia/controller.js');
var Utils = require('./utils.js');
var keys = require('../../keys.js');

PeopleDB.findAll().then(function(people) {

  var wikis = {};
  people.forEach(function(person) {

    var obj = wikis[person.get('fullName')] = [];
    obj[0] = person.get('id');

  });

  return wikis;

}).then(function(wikis) {

  var names = Object.keys(wikis);

  names.forEach(function(name) {

    try {
      WikipediaApi.from_api(name, 'en', function(markup) {

        var id = wikis[name][0];
        var fullName = name;
        var occupation = parseJob(markup);
        var extract = parseExtract(markup);
        var url = 'http://en.wikipedia.org/wiki/' + encodeURIComponent(fullName);

        var update = {
          'id': id,
          'wikipedia': {
            'fullName': fullName,
            'occupation': occupation,
            'extract': extract,
            'url': url
          }
        };

        // update Wikipedia table
        Populr.add(update);

      });
    }catch (err) { console.log(err); }
  });
});

function parseJob(markup) {

  // gets the first sentence in Wikipedia markup
  var sentence = WikipediaApi.plaintext(markup).split(/\. [A-Z]/)[0];

  // split after name and DOB
  var arr = sentence.split(' is ');
  arr.splice(0, 1);

  // get their job
  return arr.join(' is ').replace(/^a /, '').replace(/^an /, '').replace(/^the /, '');
};

function parseExtract(markup) {
  var Intro = WikipediaApi.parse(markup).text.Intro;
  var extract = '';
  Intro.forEach(function(object) {
    extract += object.text + ' ';
  });

  return extract;
};
