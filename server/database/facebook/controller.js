
/**
 * Facebook controller
 * @module facebook/controller
 */

var Facebook = require('./model');
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
 * Takes a fullName and returns the corresponding data on the Facebook table
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
    log('${a}: Checking facebook table', fullName);
    return Facebook.findOne(fullName).then(function(foundFacebook) {
      if (!foundFacebook) {
        log('${a}: Not found in facebook table', fullName);
        return null;
      } else {
        log('${a}: Found in facebook table', fullName);
        return foundFacebook.get();
      }
    });
  }
};

/**
 * Takes an object with a UUID and attaches and returns the corresponding data on the Facebook table to the object
 *
 * @param {Object} personObj The personObj with a UUID on it that you want to attach the facebook data onto
 *
 * @return {personObj} personObj with attached facebook (personObj.facebook)
 */
module.exports.attachData = function(personObj) {
  if (!personObj) {
    return null;
  } else {
    return module.exports.query(personObj.fullName).then(function(foundFacebook) {
      if (!foundFacebook) {
        return personObj;
      } else {
        log('${a}: Attaching facebook data', personObj.fullName);
        personObj.facebook = foundFacebook;
        return personObj;
      }
    });
  }
};

/**
 * Takes a personObj with an fullName and facebook data and either creates or updates it's corresponding entry in the Facebook table
 *
 * @param {Object} personObj The personObj with a fullName on it that you want to create or update
 *
 * @return the original personObj
 */
module.exports.add = function(personObj) {
  if (!personObj.facebook) {
    return personObj;
  } else {
    var query = { where: { fullName: personObj.fullName } };
    log('${a}: Checking facebook table', personObj.fullName);
    return Facebook.findOne(query).then(function(foundFacebook) {
      if (foundFacebook) {
        log('${a}: Found in facebook table', personObj.fullName);
        log('${a}: Updating facebook data', personObj.fullName);
        foundFacebook.update(personObj.facebook);
        return personObj;
      } else {
        log('${a}: Not found in facebook table', personObj.fullName);
        log('${a}: Creating entry in facebook table', personObj.fullName);
        personObj.facebook.fullName = personObj.fullName;
        return Facebook.create(personObj.facebook).then(function(newFacebook) {
          return personObj;
        });
      }
    });
  }
};
