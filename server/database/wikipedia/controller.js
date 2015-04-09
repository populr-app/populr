
/**
 * Wikipedia controller
 * @module wikipedia/controller
 */

var Wikipedia = require('./model');
var log = require('../../helpers/logger').log;

/* Routes Handlers (not yet implemented) */

module.exports.get = function() {
};

module.exports.post = function() {
};

/**
 * Takes a UUID and returns the corresponding data on the Wikipedia table
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
    log('${a}: Checking wikipedia table', UUID);
    return Wikipedia.findOne(UUID).then(function(foundWikipedia) {
      if (!foundWikipedia) {
        log('${a}: Not found in wikipedia table', UUID);
        return null;
      } else {
        log('${a}: Found in wikipedia table', UUID);
        return foundWikipedia.get();
      }
    });
  }
};

/**
 * Takes an object with a UUID and attaches and returns the corresponding data on the Wikipedia table to the object
 *
 * @param {Object} personObj The personObj with a UUID on it that you want to attach the wikipedia data onto
 *
 * @return {personObj} personObj with attached wikipedia (personObj.wikipedia)
 */
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
/**
 * Takes a personObj with an ID and wikipedia data and either creates or updates it's corresponding entry in the Wikipedia table
 *
 * @param {Object} personObj The personObj with a UUID on it that you want to create or update
 *
 * @return the original personObj
 */
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
