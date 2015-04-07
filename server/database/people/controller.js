
var validate = require('validator');
var People = require('./model');
var twitterController = require('../twitter/controller');
var wikipediaController = require('../wikipedia/controller');

/* Routes Handlers */

module.exports.attach = function(req, res, next, id) {
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
    .then(twitterController.query)
    .then(wikipediaController.query)
    .then(function(data) {
      if (!data) res.send('Invalid Query');
      else res.send(data);
    });
};

// BOSS OF A POST METHOD RIGHT HERE

module.exports.post = function(req, res, next) {
  if (Array.isArray(req.body.people)) {
    req.body.people.forEach(function(person) {
      module.exports.query({where: {fullName: person.fullName}})
        .then(function(data) {
          if (!data) {
            return People.create(person)
              .then(function(taco) {
                person.id = taco.get().id;
                return person;
              });
          } else {
            person.id = data.id;
            return person;
          }
        })
        .then(twitterController.createOrUpdate)
        .then(wikipediaController.createOrUpdate);
    });
  } else if (req.body.fullName) {
    module.exports.query({where: {fullName: req.body.fullName}})
      .then(function(data) {
        if (!data) {
          return People.create(req.body)
            .then(function(taco) {
              req.body.id = taco.get().id;
              return req.body;
            });
        } else {
          req.body.id = data.id;
          return req.body;
        }
      })
      .then(twitterController.createOrUpdate)
      .then(function(data) {
        console.log(data);
      });
      // .then(wikipediaController.createOrUpdate);
  } else {
    res.send('Invalid Post');
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
