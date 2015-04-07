
var Top = require('./model');
var peopleController = require('../people/controller');
var wikipediaController = require('../wikipedia/controller');

/* Routes Handlers */

module.exports.attachParam = function(req, res, next, id) {
  req.body.list = id;
  next();
};

module.exports.get = function(req, res) {
  module.exports.getTop(req.body.list).then(function(data){
    res.send(data);
  })
};

/* Methods */

module.exports.query = function(query) {
  if (!query) return null;
  return Top.findOne(query).then(function(foundTop) {
    if (!foundTop) return null;
    else return foundTop.get();
  });
};

module.exports.getTop = function(which){
  return Top.findAll({order: 'rank DESC'}).then(function(data){
    lists = {a: [], b: [], c: [], d: []};
    data.forEach(function(person, index) {
      if (index <= 49) lists.a.push(person.get());
      else if (index <= 99) lists.b.push(person.get());
      else if (index <= 149) lists.c.push(person.get());
      else lists.d.push(person.get());
    });
    if (which) return lists[which];
    else return lists;
  });
}
