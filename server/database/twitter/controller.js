
/**
 * Twitter controller
 * @module twitter/controller
 */

var Twitter = require('./model');
var log = require('../../helpers/logger').log;

/* Routes Handlers (not yet implemented) */

module.exports.attachParam = function(req, res, next, id) {
  req.body = {fullName: id};
  next();
};

module.exports.get = function(req, res, next) {
  var person = req.body;
  module.exports.query(person.fullName)
    .then(function(data) {
      if (!data) {
        log('Invalid GET');
        res.send(person.fullName + ' Not found');
      } else {
        log('${a}: Sending data to client', data.fullName);
        res.send(data);
      }
    });
};

/**
 * Takes a fullName and returns the corresponding data on the Twitter table
 *
 * @param {String} fullName Full name of the data you desire
 *
 * @return {Object} {
 *   fullName: String,
 *   score: Number,
 *   scoreChange: Number
 * }
 */
module.exports.query = function(fullName) {
  if (!fullName) {
    return null;
  } else {
    var query = { where: { fullName: fullName } };
    log('${a}: Checking twitter table', fullName);
    return Twitter.findOne(fullName).then(function(foundTwitter) {
      if (!foundTwitter) {
        log('${a}: Not found in twitter table', fullName);
        return null;
      } else {
        log('${a}: Found in twitter table', fullName);
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
    return module.exports.query(personObj.fullName).then(function(foundTwitter) {
      if (!foundTwitter) {
        return personObj;
      } else {
        log('${a}: Attaching twitter data', personObj.fullName);
        personObj.twitter = foundTwitter;
        return personObj;
      }
    });
  }
};

/**
 * Takes a personObj with an fullName and twitter data and either creates or updates it's corresponding entry in the Twitter table
 *
 * @param {Object} personObj The personObj with a fullName on it that you want to create or update
 *
 * @return the original personObj
 */
module.exports.add = function(personObj) {
  if (!personObj.twitter) {
    return personObj;
  } else {
    var query = { where: { fullName: personObj.fullName } };
    log('${a}: Checking twitter table', personObj.fullName);
    return Twitter.findOne(query).then(function(foundTwitter) {
      if (foundTwitter) {
        log('${a}: Found in twitter table', personObj.fullName);
        log('${a}: Updating twitter data', personObj.fullName);
        foundTwitter.update(personObj.twitter);
        return personObj;
      } else {
        log('${a}: Not found in twitter table', personObj.fullName);
        log('${a}: Creating entry in twitter table', personObj.fullName);
        personObj.twitter.fullName = personObj.fullName;
        return Twitter.create(personObj.twitter).then(function(newTwitter) {
          return personObj;
        });
      }
    });
  }
};
