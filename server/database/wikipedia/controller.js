
var Wikipedia = require('./model');

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
  return Wikipedia.findOne(query).then(function(foundWikipedia) {
    if (!foundWikipedia) return null;
    else return foundWikipedia.get();
  });
};

// Attaches the matched data to the passed in person obj, used for
// detail view get requests so we can send back all of a person's data
module.exports.attachData = function(personObj) {
  if (!personObj) return null;
  var query = { where: { id: personObj.id } };
  return module.exports.query(query).then(function(foundWikipedia) {
    if (!foundWikipedia) return personObj;
    else {
      personObj.wikipedia = foundWikipedia;
      return personObj;
    }
  });
};

// Adds or updates an entry in the database, takes a person object
// that has an ID and a given dataset
// TODO: Update
module.exports.add = function(personObj) {
  if (!personObj.wikipedia) return personObj;
  var query = { where: { id: personObj.id } };
  return module.exports.query(query).then(function(foundWikipedia) {
    if (foundWikipedia) return personObj;
    else {
      personObj.wikipedia.id = personObj.id;
      return Wikipedia.create(personObj.wikipedia).then(function(newWikipedia) {
        return personObj;
      });
    }
  });
};
