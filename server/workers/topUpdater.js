
var People = require('../database/people/model');
var Top = require('../database/top/model');
var Context = require('../database/context/controller');
var Twitter = require('../database/twitter/controller');

module.exports = function() {
  return Top.drop().then(function() {
    return Top.sync();
  }).then(function() {
    return People.findAll({ limit: 200, order: 'score DESC' });
  }).each(function(person, i) {
    if (person) {
      person = person.get();
      person.rank = i + 1;
      return Context.attachData(person)
        .then(Twitter.attachData)
        .then(function(newPerson) {
          newPerson.profilePic = newPerson.twitter.profilePic;
          newPerson.dob = newPerson.context.dob;
          newPerson.occupation = newPerson.context.occupation;
          return Top.create(newPerson);
        });
    }
  });
};
