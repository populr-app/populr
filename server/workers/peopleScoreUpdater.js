
var PeopleController = require('../database/people/controller');
var People = require('../database/people/model');

module.exports = function() {
  People.findAll().then(function(data) {
    data.forEach(function(person) {
      PeopleController.attachData({where: {id:person.get().id}}).then(function(data) {
        var score = 0;
        if (data.twitter) score += (data.twitter.score + data.twitter.scoreChange);
        var newStuff = {
          score: score,
          scoreChange: score - data.score
        };
        person.update(newStuff);
      });
    });
  });
};
