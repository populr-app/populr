var WikipediaApi = require('wtf_wikipedia');
var Sleep = require('sleep');
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

  // Gets full names from wikis object
  var names = Object.keys(wikis);

  // Loops over names, querying them in Wikipedia
  names.forEach(function(name) {

    WikipediaApi.from_api(name, 'en', function(markup) {
      if(!markup){ console.log(name); return;}
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
  });
});

function parseJob(markup) {

  // gets the first sentence in Wikipedia markup
  var sentence = WikipediaApi.plaintext(markup).split(/\. [A-Z]/)[0];

  // split after name and DOB
  var arr = sentence.split(' is ');
  arr.splice(0, 1);

  // get their job
  var job = arr.join(' is ').replace(/^a /, '').replace(/^an /, '').replace(/^the /, '');
  job = job.split(' who')[0];
  job = job.split(', where')[0];
  job = job.split(' from')[0];
  job = job.split('; ')[0];
  job = job.replace(/[,.:;!@#$%^&*()+ ]+$/, '');

  // if job description is over 90 characters, is probably bad.
  return job.length > 90 ? '' : job;
};

function parseExtract(markup) {
  var Intro = WikipediaApi.parse(markup).text.Intro;
  var extract = '';
  Intro.forEach(function(object) {
    extract += object.text + ' ';
  });

  return extract;
};
