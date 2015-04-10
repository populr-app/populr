
var Top = require('./model');
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
      person = person.get();
      lists.all.push(person);
      if (index <= 49) lists.a.push(person);
      else if (index <= 99) lists.b.push(person);
      else if (index <= 149) lists.c.push(person);
      else lists.d.push(person);
    });

    if (lists[which]) return lists[which];
    else {
      delete lists.all;
      return lists;
    }
  });
};
