
var Wikipedia = require('./model');
var log = require('../../helpers/logger').log;

/* Routes Handlers (not yet implemented) */

module.exports.get = function() {
};

module.exports.post = function() {
};

/* Methods */

// Takes a query object ({where: {}}) and returns the db entry
// that it finds or returns null if there are none
module.exports.query = function(query) {
  if (!query) {
    return null;
  } else {
    log('${a}: Checking wikipedia table', query.where.id || query.where.fullName);
    return Wikipedia.findOne(query).then(function(foundWikipedia) {
      if (!foundWikipedia) {
        log('${a}: Not found in wikipedia table', query.where.id || query.where.fullName);
        return null;
      } else {
        log('${a}: Found in wikipedia table', query.where.id || query.where.fullName);
        return foundWikipedia.get();
      }
    });
  }
};

// Attaches the matched data to the passed in person obj, used for
// detail view get requests so we can send back all of a person's data
module.exports.attachData = function(personObj) {
  if (!personObj) {
    return null;
  } else {
    var query = { where: { id: personObj.id } };
    return module.exports.query(query).then(function(foundWikipedia) {
      if (!foundWikipedia) {
        return personObj;
      } else {
        log('${a}: Attaching wikipedia data', personObj.id);
        personObj.wikipedia = foundWikipedia;
        return personObj;
      }
    });
  }
};

// Adds or updates an entry in the database, takes a person object
// that has an ID and a given dataset
// Ex: {id: '', wikipedia: {}}
module.exports.add = function(personObj) {
  if (!personObj.wikipedia) {
    return personObj;
  } else {
    var query = { where: { id: personObj.id } };
    log('${a}: Checking wikipedia table', query.where.id || query.where.fullName);
    return Wikipedia.findOne(query).then(function(foundWikipedia) {
      if (foundWikipedia) {
        log('${a}: Found in wikipedia table', query.where.id || query.where.fullName);
        log('${a}: Updating wikipedia data', query.where.id || query.where.fullName);
        foundWikipedia.update(personObj.wikipedia);
        return personObj;
      } else {
        log('${a}: Not found in wikipedia table', query.where.id || query.where.fullName);
        log('${a}: Creating entry in wikipedia table', query.where.id || query.where.fullName);
        personObj.wikipedia.id = personObj.id;
        return Wikipedia.create(personObj.wikipedia).then(function(newWikipedia) {
          return personObj;
        });
      }
    });
  }
};
