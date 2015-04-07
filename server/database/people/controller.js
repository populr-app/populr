
var validate = require('validator');
var People = require('./model');
var twitterController = require('../twitter/controller');
var wikipediaController = require('../wikipedia/controller');

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
  module.exports.query({where: person}) // <-- New Api Here
    .then(twitterController.attachData)
    .then(wikipediaController.attachData)
    .then(function(data) {
      if (!data) res.send('Invalid GET');
      else res.send(data);
    });
};

module.exports.post = function(req, res, next) {
  if (Array.isArray(req.body.people)) {
    req.body.people.forEach(function(personObj) {
      module.exports.add(personObj) // <-- New Api Here
        .then(twitterController.add)
        .then(wikipediaController.add)
        .then(function(data) {
          if (!data) res.send('Invalid POST');
          else res.send(data);
        });
    });
  } else if (req.body.fullName || req.body.id) {
    module.exports.add(req.body) // <-- New Api Here
      .then(twitterController.add)
      .then(wikipediaController.add)
      .then(function(data) {
        console.log(data);
        if (!data) res.send('Invalid POST');
        else res.send(data);
      });
  } else {
    res.send('Invalid POST');
  }
};

/* Methods */

module.exports.query = function(query) {
  if (!query) return null;
  return People.findOne(query).then(function(data) {
    if (!data) {
      return null;
    } else {
      return data.get();
    }
  });
};

module.exports.add = function(personObj) {
  if (!personObj.id && !personObj.fullName) return null;
  var query = personObj.id ? { where: { id: personObj.id } } : { where: { fullName: personObj.fullName } };
  return module.exports.query(query).then(function(foundPerson) {
    if (!foundPerson) {
      return People.create(personObj).then(function(newPerson) {
        personObj.id = newPerson.get().id;
        return personObj;
      });
    } else {
      personObj.id = foundPerson.id;
      return personObj;
    }
  });
};
