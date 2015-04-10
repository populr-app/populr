
/**
 * People controller
 * @module people/controller
 */

var People = require('./model');
var twitterController = require('../twitter/controller');
var contextController = require('../context/controller');
var sitesController = require('../sites/controller');
var log = require('../../helpers/logger').log;


module.exports.attachParam = function(req, res, next, id) {
  req.body = {fullName: id};
  next();
};

module.exports.get = function(req, res, next) {
  var person = req.body;
  module.exports.query(person.fullName)
    .then(twitterController.attachData)
    .then(contextController.attachData)
    .then(sitesController.attachData)
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

module.exports.post = function(req, res, next) {
  if (Array.isArray(req.body.people)) {
    log('Array of people: Post Request');
    req.body.people.forEach(function(personObj) {
      module.exports.add(personObj)
        .then(twitterController.add)
        .then(contextController.add)
        .then(sitesController.add)
        .then(function(data) {
          if (!data) {
            log('Invalid POST');
            // res.send('Invalid POST');
          } else {
            // res.send(data);
          }
        });
    });
  } else if (req.body.fullName) {
    log('${a}: Post Request', req.body.fullName);
    module.exports.add(req.body)
      .then(twitterController.add)
      .then(contextController.add)
      .then(sitesController.add)
      .then(function(data) {
        if (!data) {
          log('Invalid POST');
          res.send('Invalid POST');
        } else {
          log('Successful POST');
          res.send(data);
        }
      });
  } else {
    log('Invalid POST');
    res.send('Invalid POST');
  }
};

/* Methods */

module.exports.query = function(fullName) {
  if (!fullName) {
    return null;
  } else {
    var query = { where: { fullName: fullName } };
    log('${a}: Checking people table', fullName);
    return People.findOne(query).then(function(foundPeople) {
      if (!foundPeople) {
        log('${a}: Not found in people table', fullName);
        return null;
      } else {
        log('${a}: Found in people table', fullName);
        return foundPeople.get();
      }
    });
  }
};

module.exports.add = function(personObj) {
  if (!personObj.fullName) {
    return null;
  } else {
    return module.exports.query(personObj.fullName).then(function(foundPerson) {
      if (foundPerson) {
        log('${a}: Sending through pipeline', personObj.fullName);
        return personObj;
      } else {
        log('${a}: Creating entry in people table', personObj.fullName);
        return People.create(personObj).then(function() {
          log('${a}: Sending through pipeline', personObj.fullName);
          return personObj;
        });
      }
    });
  }
};
