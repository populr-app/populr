
var Twitter = require('./model');

module.exports.get = function() {
  console.log('get');
};

module.exports.post = function() {
  console.log('post');
};

module.exports.query = function(person) {
  if (!person) return null;
  return Twitter.findOne({where: {id:person.id}}).then(function(data) {
    if (!data) {
      return person;
    } else {
      person.twitter = data.get();
      return person;
    }
  });
};

module.exports.createOrUpdate = function(person) {
  if (!person.twitter) return person;
  return Twitter.findOne({where: {id:person.id}}).then(function(data) {
    if (!data) {
      person.twitter.id = person.id;
      return Twitter.create(person.twitter).then(function(newData) {
        person.twitter = newData.get();
        return person;
      });
    } else {
      person.twitter.followersChange = person.twitter.followers - data.get().followers;
      return data.update(person.twitter).then(function(newData) {
        person.twitter = newData.get();
        return person;
      });
    }
  });
};
