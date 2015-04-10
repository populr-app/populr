
/**
 * Twitter controller
 * @module twitter/controller
 */

var Twitter = require('./model');
var log = require('../../helpers/logger').log;

/* Routes Handlers (not yet implemented) */

module.exports.get = function() {
};

module.exports.post = function() {
};

/**
 * Takes a UUID and returns the corresponding data on the Twitter table
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
    log('${a}: Checking twitter table', UUID);
    return Twitter.findOne(UUID).then(function(foundTwitter) {
      if (!foundTwitter) {
        log('${a}: Not found in twitter table', UUID);
        return null;
      } else {
        log('${a}: Found in twitter table', UUID);
        return foundTwitter.get();
      }
    });
  }
};

/**
 * Takes an object with a UUID and attaches and returns the corresponding data on the Twitter table to the object
 *
 * @param {Object} personObj The personObj with a UUID on it that you want to attach the twitter data onto
 *
 * @return {personObj} personObj with attached twitter (personObj.twitter)
 */
module.exports.attachData = function(personObj) {
  if (!personObj) {
    return null;
  } else {
    var query = { where: { id: personObj.id } };
    return module.exports.query(query).then(function(foundTwitter) {
      if (!foundTwitter) {
        return personObj;
      } else {
        log('${a}: Attaching twitter data', personObj.id);
        personObj.twitter = foundTwitter;
        return personObj;
      }
    });
  }
};

// Adds or updates an entry in the database, takes a person object
// that has an ID and a given dataset
// Ex: {id: '', twitter: {}}
/**
 * Takes a personObj with an ID and twitter data and either creates or updates it's corresponding entry in the Twitter table
 *
 * @param {Object} personObj The personObj with a UUID on it that you want to create or update
 *
 * @return the original personObj
 */
module.exports.add = function(personObj) {
  if (!personObj.twitter) {
    return personObj;
  } else {
    var query = { where: { id: personObj.id } };
    log('${a}: Checking twitter table', query.where.id || query.where.fullName);
    return Twitter.findOne(query).then(function(foundTwitter) {
      if (foundTwitter) {
        log('${a}: Found in twitter table', query.where.id || query.where.fullName);
        log('${a}: Updating twitter data', query.where.id || query.where.fullName);
        foundTwitter.update(personObj.twitter);
        return personObj;
      } else {
        log('${a}: Not found in twitter table', query.where.id || query.where.fullName);
        log('${a}: Creating entry in twitter table', query.where.id || query.where.fullName);
        personObj.twitter.id = personObj.id;
        return Twitter.create(personObj.twitter).then(function(newTwitter) {
          return personObj;
        });
      }
    });
  }
};
