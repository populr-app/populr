
/*
 * Template
 * template
 * Highlight the words above, hold cmd + shift + D
 * replace them with the name of your db
 * Make sure to capitalize the first letter while on the first change
 * and delete this block when done!
 */

var Template = require('./model');
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
    log('${a}: Checking template table', query.where.id || query.where.fullName);
    return Template.findOne(query).then(function(foundTemplate) {
      if (!foundTemplate) {
        log('${a}: Not found in template table', query.where.id || query.where.fullName);
        return null;
      } else {
        log('${a}: Found in template table', query.where.id || query.where.fullName);
        return foundTemplate.get();
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
