
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
    return Twitter.findOne(query).then(function(foundTwitter) {
      if (!foundTwitter) {
        return null;
      } else {
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
        personObj.twitter = foundTwitter;
        return personObj;
      }
    });
  }
};

// Adds or updates an entry in the database, takes a person object
// that has an ID and a given dataset
// TODO: Update
// Ex: {id: '', twitter: {}}
module.exports.add = function(personObj) {
  if (!personObj.twitter) {
    return personObj;
  } else {
    var query = { where: { id: personObj.id } };
    return Twitter.findOne(query).then(function(foundTwitter) {
      if (foundTwitter) {
        foundTwitter.update(personObj.twitter);
        return personObj;
      } else {
        personObj.twitter.id = personObj.id;
        return Twitter.create(personObj.twitter).then(function(newTwitter) {
          return personObj;
        });
      }
    });
  }
};
