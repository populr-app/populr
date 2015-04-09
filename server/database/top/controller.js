
var Top = require('./model');
var peopleController = require('../people/controller');
var wikipediaController = require('../wikipedia/controller');
var log = require('../../helpers/logger').log;

/* Routes Handlers */

module.exports.attachParam = function(req, res, next, id) {
  req.body.list = id;
  next();
};

module.exports.get = function(req, res) {
  module.exports.query(req.body.list).then(function(data) {
    res.send(data);
  });
};

/* Methods */

// Optionally takes a list name (a, b, c, d) and returns the
// requested list or all 4 lists (sorted)
module.exports.query = function(which) {
  return Top.findAll({order: 'rank ASC'}).then(function(data) {
    lists = {a: [], b: [], c: [], d: [], all: []};
    data.forEach(function(person, index) {
      lists.all.push(person.get());
      if (index <= 49) lists.a.push(person.get());
      else if (index <= 99) lists.b.push(person.get());
      else if (index <= 149) lists.c.push(person.get());
      else lists.d.push(person.get());
    });

    if (lists[which]) return lists[which];
    else return lists;
  });
};
