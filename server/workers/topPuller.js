
var People = require('../database/people/model');
var Wikipedia = require('../database/wikipedia/model');
var Top = require('../database/top/model');

People.findAll({ limit: 200, order: 'score DESC' }).then(function(data) {
  for (var i = 0; i < data.length; i++) {
    var person = data[i].get();
    person.rank = i+1;
    console.log(person);
    Top.create(person);
  };
});
