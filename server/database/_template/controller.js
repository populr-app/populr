
var Template = require('./model');

/* Routes Handlers (not yet implemented) */

module.exports.get = function() {
};

module.exports.post = function() {
};

/* Methods */

// Takes a query object ({where: {}}) and returns the db entry
// that it finds or returns null if there are none
module.exports.query = function(query) {
  if (!query) return null;
  return Template.findOne(query).then(function(foundTemplate) {
    if (!foundTemplate) return null;
    else return foundTemplate.get();
  });
};

// Attaches the matched data to the passed in person obj, used for
// detail view get requests so we can send back all of a person's data
module.exports.attachData = function(personObj) {
  if (!personObj) return null;
  var query = { where: { id: personObj.id } };
  return module.exports.query(query).then(function(foundTemplate) {
    if (!foundTemplate) return personObj;
    else {
      personObj.template = foundTemplate;
      return personObj;
    }
  });
};

// Adds or updates an entry in the database, takes a person object
// that has an ID and a given dataset
// TODO: Update
module.exports.add = function(personObj) {
  if (!personObj.template) return personObj;
  var query = { where: { id: personObj.id } };
  return module.exports.query(query).then(function(foundTemplate) {
    if (foundTemplate) return personObj;
    else {
      personObj.template.id = personObj.id;
      return Template.create(personObj.template).then(function(newTemplate) {
        return personObj;
      });
    }
  });
};
