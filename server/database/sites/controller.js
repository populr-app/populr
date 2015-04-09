
var Sites = require('./model');
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
    log('${a}: Checking sites table', query.where.id || query.where.fullName);
    return Sites.findOne(query).then(function(foundSites) {
      if (!foundSites) {
        log('${a}: Not found in sites table', query.where.id || query.where.fullName);
        return null;
      } else {
        log('${a}: Found in sites table', query.where.id || query.where.fullName);
        return foundSites.get();
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
    return module.exports.query(query).then(function(foundSites) {
      if (!foundSites) {
        return personObj;
      } else {
        log('${a}: Attaching sites data', personObj.id);
        personObj.sites = foundSites;
        return personObj;
      }
    });
  }
};

// Adds or updates an entry in the database, takes a person object
// that has an ID and a given dataset
// Ex: {id: '', sites: {}}
module.exports.add = function(personObj) {
  if (!personObj.sites) {
    return personObj;
  } else {
    var query = { where: { id: personObj.id } };
    log('${a}: Checking sites table', query.where.id || query.where.fullName);
    return Sites.findOne(query).then(function(foundSites) {
      if (foundSites) {
        log('${a}: Found in sites table', query.where.id || query.where.fullName);
        log('${a}: Updating sites data', query.where.id || query.where.fullName);
        foundSites.update(personObj.sites);
        return personObj;
      } else {
        log('${a}: Not found in sites table', query.where.id || query.where.fullName);
        log('${a}: Creating entry in sites table', query.where.id || query.where.fullName);
        personObj.sites.id = personObj.id;
        return Sites.create(personObj.sites).then(function(newSites) {
          return personObj;
        });
      }
    });
  }
};
