
var People = require('../database/people/model');
var Top = require('../database/top/model');

Top.drop().then(function() {
  Top.sync();
});

module.exports = function() {
  Top.drop().then(function() {
    return Top.sync();
  }).then(function() {
    People.findAll({ limit: 200, order: 'score DESC' }).then(function(data) {
      if (data.length) {
        for (var i = 0; i < data.length; i++) {
          var person = data[i].get();
          person.rank = i + 1;
          Top.create(person);
        }
      }
    });
  });
};
