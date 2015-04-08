
var People = require('../database/people/model');
var fs = require('fs-utils');

People.findAll()
  .then(function(data) {
    var array = [];
    for (var i = 0; i < data.length; i++) {
      array.push(data[i].get().fullName);
    }

    return array;
  })
  .then(function(data) {
    fs.writeJSON('fullNames.json', {names:data}, function() {
      console.log('Done!');
    });
  });
