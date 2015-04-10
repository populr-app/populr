
/**
 * Sites controller
 * @module sites/controller
 */

var Sites = require('./model');
var log = require('../../helpers/logger').log;

/* Routes Handlers (not yet implemented) */

module.exports.get = function() {
};

module.exports.post = function() {
};

/**
 * Takes a UUID and returns the corresponding data on the Sites table
 *
 * @param {String} UUID Unique identifier of the data you desire
 *
 * @return {Object} {
 *   id: String,
 *   score: Number,
 *   scoreChange: Number
 * }
 */
module.exports.query = function(UUID) {
  if (!UUID) {
    return null;
  } else {
    var query = { where: { id: UUID } };
    log('${a}: Checking sites table', UUID);
    return Sites.findOne(UUID).then(function(foundSites) {
      if (!foundSites) {
        log('${a}: Not found in sites table', UUID);
        return null;
      } else {
        log('${a}: Found in sites table', UUID);
        return foundSites.get();
      }
    });
  }
};

/**
 * Takes an object with a UUID and attaches and returns the corresponding data on the Sites table to the object
 *
 * @param {Object} personObj The personObj with a UUID on it that you want to attach the sites data onto
 *
 * @return {personObj} personObj with attached sites (personObj.sites)
 */
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
/**
 * Takes a personObj with an ID and sites data and either creates or updates it's corresponding entry in the Sites table
 *
 * @param {Object} personObj The personObj with a UUID on it that you want to create or update
 *
 * @return the original personObj
 */
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
