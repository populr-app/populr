
var Sitehits = require('./model');
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
    log('${a}: Checking sitehits table', query.where.id || query.where.fullName);
    return Sitehits.findOne(query).then(function(foundSitehits) {
      if (!foundSitehits) {
        log('${a}: Not found in sitehits table', query.where.id || query.where.fullName);
        return null;
      } else {
        log('${a}: Found in sitehits table', query.where.id || query.where.fullName);
        return foundSitehits.get();
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
    return module.exports.query(query).then(function(foundSitehits) {
      if (!foundSitehits) {
        return personObj;
      } else {
        log('${a}: Attaching sitehits data', personObj.id);
        personObj.sitehits = foundSitehits;
        return personObj;
      }
    });
  }
};

// Adds or updates an entry in the database, takes a person object
// that has an ID and a given dataset
// Ex: {id: '', sitehits: {}}
module.exports.add = function(personObj) {
  if (!personObj.sitehits) {
    return personObj;
  } else {
    var query = { where: { id: personObj.id } };
    log('${a}: Checking sitehits table', query.where.id || query.where.fullName);
    return Sitehits.findOne(query).then(function(foundSitehits) {
      if (foundSitehits) {
        log('${a}: Found in sitehits table', query.where.id || query.where.fullName);
        log('${a}: Updating sitehits data', query.where.id || query.where.fullName);
        foundSitehits.update(personObj.sitehits);
        return personObj;
      } else {
        log('${a}: Not found in sitehits table', query.where.id || query.where.fullName);
        log('${a}: Creating entry in sitehits table', query.where.id || query.where.fullName);
        personObj.sitehits.id = personObj.id;
        return Sitehits.create(personObj.sitehits).then(function(newSitehits) {
          return personObj;
        });
      }
    });
  }
};
