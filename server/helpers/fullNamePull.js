
var People = require('../database/people/model');
var fs = require('fs-utils');

People.findAll()
  .then(function(data) {
    var array = [];
    for (var i = 0; i < data.length; i++) {
      var obj = {
        fullName: data[i].get().fullName,
        id: data[i].get().id,
        sites: {
          count: 0,
          countChange: 0
        }
      };
      array.push(obj);
    }

    return array;
  })
  .then(function(data) {
    fs.writeJSON('fullNames.json', {names:data}, function() {
      console.log('Done!');
    });
  });
