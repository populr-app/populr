
/*
 * Template
 * template
 * Highlight the words above, hold cmd + shift + D
 * replace them with the name of your db
 * Make sure to capitalize the first letter while on the first change
 * and delete this block when done!
 */

/**
 * Template controller
 * @module template/controller
 */

var Template = require('./model');
var log = require('../../helpers/logger').log;

/* Routes Handlers (not yet implemented) */

module.exports.get = function() {
};

module.exports.post = function() {
};

/**
 * Takes a fullName and returns the corresponding data on the Template table
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
    log('${a}: Checking template table', fullName);
    return Template.findOne(fullName).then(function(foundTemplate) {
      if (!foundTemplate) {
        log('${a}: Not found in template table', fullName);
        return null;
      } else {
        log('${a}: Found in template table', fullName);
        return foundTemplate.get();
      }
    });
  }
};

/**
 * Takes an object with a UUID and attaches and returns the corresponding data on the Template table to the object
 *
 * @param {Object} personObj The personObj with a UUID on it that you want to attach the template data onto
 *
 * @return {personObj} personObj with attached template (personObj.template)
 */
module.exports.attachData = function(personObj) {
  if (!personObj) {
    return null;
  } else {
    return module.exports.query(personObj.fullName).then(function(foundTemplate) {
      if (!foundTemplate) {
        return personObj;
      } else {
        log('${a}: Attaching template data', personObj.fullName);
        personObj.template = foundTemplate;
        return personObj;
      }
    });
  }
};

/**
 * Takes a personObj with an fullName and template data and either creates or updates it's corresponding entry in the Template table
 *
 * @param {Object} personObj The personObj with a fullName on it that you want to create or update
 *
 * @return the original personObj
 */
module.exports.add = function(personObj) {
  if (!personObj.template) {
    return personObj;
  } else {
    var query = { where: { fullName: personObj.fullName } };
    log('${a}: Checking template table', personObj.fullName);
    return Template.findOne(query).then(function(foundTemplate) {
      if (foundTemplate) {
        log('${a}: Found in template table', personObj.fullName);
        log('${a}: Updating template data', personObj.fullName);
        foundTemplate.update(personObj.template);
        return personObj;
      } else {
        log('${a}: Not found in template table', personObj.fullName);
        log('${a}: Creating entry in template table', personObj.fullName);
        personObj.template.fullName = personObj.fullName;
        return Template.create(personObj.template).then(function(newTemplate) {
          return personObj;
        });
      }
    });
  }
};
