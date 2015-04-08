
var validate = require('validator');
var People = require('./model');
var twitterController = require('../twitter/controller');
var wikipediaController = require('../wikipedia/controller');
var log = require('../../helpers/logger').log;

/* Routes Handlers */

module.exports.attachParam = function(req, res, next, id) {
  if (validate.isUUID(id)) {
    req.body = {id: id};
    next();
  } else {
    req.body = {fullName: id};
    next();
  }
};

module.exports.get = function(req, res, next) {
  var person = req.body;
  module.exports.query({where: person})
    .then(function(data) {
      if (data) {
        log('${a}: Sending through pipeline', data.id);
      }

      return data;
    })
    .then(twitterController.attachData)
    .then(wikipediaController.attachData)
    .then(function(data) {
      if (!data) {
        log('Invalid GET');
        res.send(person.id || person.fullName + ' Not found');
      } else {
        log('${a}: Sending data to client', data.id);
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
        .then(wikipediaController.add)
        .then(function(data) {
          if (!data) {
            log('Invalid POST');
            // res.send('Invalid POST');
          } else {
            // res.send(data);
          }
        });
    });
  } else if (req.body.fullName || req.body.id) {
    log('${a}: Post Request', req.body.id || req.body.fullName);
    module.exports.add(req.body)
      .then(twitterController.add)
      .then(wikipediaController.add)
      .then(function(data) {
        if (!data) {
          log('Invalid POST');
          res.send('Invalid POST');
        } else {
          res.send(data);
        }
      });
  } else {
    log('Invalid POST');
    res.send('Invalid POST');
  }
};

/* Methods */

module.exports.query = function(query) {
  if (!query) {
    return null;
  } else {
    log('${a}: Checking people table', query.where.id || query.where.fullName);
    return People.findOne(query).then(function(data) {
      if (!data) {
        log('${a}: Not found in people table', query.where.id || query.where.fullName);
        return null;
      } else {
        var string = query.where.fullName ? '(' + query.where.fullName + ')' : '';
        log('${a}: Found in people table ${b}', data.get().id, string);
        return data.get();
      }
    });
  }
};

module.exports.add = function(personObj) {
  if (!personObj.id && !personObj.fullName) {
    return null;
  } else {
    var query = personObj.id ? { where: { id: personObj.id } } : { where: { fullName: personObj.fullName } };
    return module.exports.query(query).then(function(foundPerson) {
      if (!foundPerson) {
        return People.create(personObj).then(function(newPerson) {
          personObj.id = newPerson.get().id;
          var string = personObj.fullName ? '(' + personObj.fullName + ')' : '';
          log('${a}: Creating in people table ${b}', personObj.id, string);
          log('${a}: Sending through pipeline', personObj.id);
          return personObj;
        });
      } else {
        personObj.id = foundPerson.id;
        log('${a}: Sending through pipeline', personObj.id);
        return personObj;
      }
    });
  }
};
