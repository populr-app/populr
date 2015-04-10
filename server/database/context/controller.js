
/**
 * Context controller
 * @module context/controller
 */

var Context = require('./model');
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

module.exports.post = function() {
};

/**
 * Takes a fullName and returns the corresponding data on the Context table
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
    log('${a}: Checking context table', fullName);
    return Context.findOne(fullName).then(function(foundContext) {
      if (!foundContext) {
        log('${a}: Not found in context table', fullName);
        return null;
      } else {
        log('${a}: Found in context table', fullName);
        return foundContext.get();
      }
    });
  }
};

/**
 * Takes an object with a UUID and attaches and returns the corresponding data on the Context table to the object
 *
 * @param {Object} personObj The personObj with a UUID on it that you want to attach the context data onto
 *
 * @return {personObj} personObj with attached context (personObj.context)
 */
module.exports.attachData = function(personObj) {
  if (!personObj) {
    return null;
  } else {
    return module.exports.query(personObj.fullName).then(function(foundContext) {
      if (!foundContext) {
        return personObj;
      } else {
        log('${a}: Attaching context data', personObj.fullName);
        personObj.context = foundContext;
        return personObj;
      }
    });
  }
};

/**
 * Takes a personObj with an fullName and context data and either creates or updates it's corresponding entry in the Context table
 *
 * @param {Object} personObj The personObj with a fullName on it that you want to create or update
 *
 * @return the original personObj
 */
module.exports.add = function(personObj) {
  if (!personObj.context) {
    return personObj;
  } else {
    var query = { where: { fullName: personObj.fullName } };
    log('${a}: Checking context table', personObj.fullName);
    return Context.findOne(query).then(function(foundContext) {
      if (foundContext) {
        log('${a}: Found in context table', personObj.fullName);
        log('${a}: Updating context data', personObj.fullName);
        foundContext.update(personObj.context);
        return personObj;
      } else {
        log('${a}: Not found in context table', personObj.fullName);
        log('${a}: Creating entry in context table', personObj.fullName);
        personObj.context.fullName = personObj.fullName;
        return Context.create(personObj.context).then(function(newContext) {
          return personObj;
        });
      }
    });
  }
};
