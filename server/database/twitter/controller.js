
var Twitter = require('./model');
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
    log('${a}: Checking twitter table', query.where.id || query.where.fullName);
    return Twitter.findOne(query).then(function(foundTwitter) {
      if (!foundTwitter) {
        log('${a}: Not found in twitter table', query.where.id || query.where.fullName);
        return null;
      } else {
        log('${a}: Found in twitter table', query.where.id || query.where.fullName);
        return foundTwitter.get();
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
