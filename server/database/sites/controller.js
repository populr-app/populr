
/**
 * Sites controller
 * @module sites/controller
 */

var Sites = require('./model');
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
 * Takes a fullName and returns the corresponding data on the Sites table
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
    log('${a}: Checking sites table', fullName);
    return Sites.findOne(fullName).then(function(foundSites) {
      if (!foundSites) {
        log('${a}: Not found in sites table', fullName);
        return null;
      } else {
        log('${a}: Found in sites table', fullName);
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
    return module.exports.query(personObj.fullName).then(function(foundSites) {
      if (!foundSites) {
        return personObj;
      } else {
        log('${a}: Attaching sites data', personObj.fullName);
        personObj.sites = foundSites;
        return personObj;
      }
    });
  }
};

/**
 * Takes a personObj with an fullName and sites data and either creates or updates it's corresponding entry in the Sites table
 *
 * @param {Object} personObj The personObj with a fullName on it that you want to create or update
 *
 * @return the original personObj
 */
module.exports.add = function(personObj) {
  if (!personObj.sites) {
    return personObj;
  } else {
    var query = { where: { fullName: personObj.fullName } };
    log('${a}: Checking sites table', personObj.fullName);
    return Sites.findOne(query).then(function(foundSites) {
      if (foundSites) {
        log('${a}: Found in sites table', personObj.fullName);
        log('${a}: Updating sites data', personObj.fullName);
        foundSites.update(personObj.sites);
        return personObj;
      } else {
        log('${a}: Not found in sites table', personObj.fullName);
        log('${a}: Creating entry in sites table', personObj.fullName);
        personObj.sites.fullName = personObj.fullName;
        return Sites.create(personObj.sites).then(function(newSites) {
          return personObj;
        });
      }
    });
  }
};
