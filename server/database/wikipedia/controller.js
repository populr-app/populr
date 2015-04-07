
var Wikipedia = require('./model');

module.exports.get = function() {
  console.log('get');
};

module.exports.post = function() {
  console.log('post');
};

module.exports.query = function(person) {
  if (!person) return null;
  return Wikipedia.findOne({where: {id:person.id}}).then(function(data) {
    if (!data) {
      return person;
    } else {
      person.wiki = data.get();
      return person;
    }
  });
};

module.exports.create = function(person) {
  if (!person.wikipedia) return person;
  person.wikipedia.id = person.id;
  return Wikipedia.create(person.wikipedia).then(function(data) {
    return person;
  });
};

module.exports.createOrUpdate = function(person) {
  if (!person.wikipedia) return person;
  console.log('UPDATE WIKI', person);
};

