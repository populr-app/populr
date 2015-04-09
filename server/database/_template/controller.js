
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
 * Takes a UUID and returns the corresponding data on the Template table
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
    log('${a}: Checking template table', UUID);
    return Template.findOne(UUID).then(function(foundTemplate) {
      if (!foundTemplate) {
        log('${a}: Not found in template table', UUID);
        return null;
      } else {
        log('${a}: Found in template table', UUID);
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
    var query = { where: { id: personObj.id } };
    return module.exports.query(query).then(function(foundTemplate) {
      if (!foundTemplate) {
        return personObj;
      } else {
        log('${a}: Attaching template data', personObj.id);
        personObj.template = foundTemplate;
        return personObj;
      }
    });
  }
};

// Adds or updates an entry in the database, takes a person object
// that has an ID and a given dataset
// Ex: {id: '', template: {}}
/**
 * Takes a personObj with an ID and template data and either creates or updates it's corresponding entry in the Template table
 *
 * @param {Object} personObj The personObj with a UUID on it that you want to create or update
 *
 * @return the original personObj
 */
module.exports.add = function(personObj) {
  if (!personObj.template) {
    return personObj;
  } else {
    var query = { where: { id: personObj.id } };
    log('${a}: Checking template table', query.where.id || query.where.fullName);
    return Template.findOne(query).then(function(foundTemplate) {
      if (foundTemplate) {
        log('${a}: Found in template table', query.where.id || query.where.fullName);
        log('${a}: Updating template data', query.where.id || query.where.fullName);
        foundTemplate.update(personObj.template);
        return personObj;
      } else {
        log('${a}: Not found in template table', query.where.id || query.where.fullName);
        log('${a}: Creating entry in template table', query.where.id || query.where.fullName);
        personObj.template.id = personObj.id;
        return Template.create(personObj.template).then(function(newTemplate) {
          return personObj;
        });
      }
    });
  }
};
