var WikipediaApi = require('wtf_wikipedia');
var Sleep = require('sleep');
var http = require('http');
var PeopleDB = require('../database/people/model.js');
var WikipediaDB = require('../database/wikipedia/model.js');
var Populr = require('../database/wikipedia/controller.js');

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
      if (!markup) {
        console.log(name); return;
      }

      var options = {
          hostname: 'en.wikipedia.org',
          path: '/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&titles=' + encodeURIComponent(name) + '&continue=',
        };

      http.get(options, function(result) {
        var buffer = '';
        result.setEncoding('utf8');

        result.on('data', function(data) {
            buffer += data;
          });

        result.on('end', function() {
            var id = wikis[name][0];
            var fullName = name;
            var extract = buffer.split('extract":"')[1].split('"}}')[0];
            var url = 'http://en.wikipedia.org/wiki/' + encodeURIComponent(fullName);
            var update = {
              'id': id,
              'wikipedia': {
                'fullName': fullName,
                'url': url,
                'extract': extract
              }
            };

            console.log(update);

            // update Wikipedia table
            Populr.add(update);
          });

      });

    });
  });
});
