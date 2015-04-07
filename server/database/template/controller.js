
var Template = require('./model');

module.exports.get = function() {
  console.log('get');
};

module.exports.post = function() {
  console.log('post');
};

module.exports.query = function(person) {
  if (!person) return null;
  return Template.findOne({where: {id:person.id}}).then(function(data) {
    if (!data) {
      return person;
    } else {
      person.template = data.get();
      return person;
    }
  });
};

module.exports.create = function(person) {
  console.log('CREATE TEMPLATE', person);
};

module.exports.update = function(person, data) {
  console.log('UPDATE TEMPLATE', person, data);
};
