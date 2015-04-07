
var Top = require('./model');
var peopleController = require('../people/controller');
var wikipediaController = require('../wikipedia/controller');

/* Routes Handlers */

module.exports.get = function() {
  console.log('get');
};

module.exports.post = function() {
  console.log('post');
};

/* Methods */

module.exports.query = function(query) {
  if (!query) return null;
  return Top.findOne(query).then(function(foundTop) {
    if (!foundTop) return null;
    else return foundTop.get();
  });
};

module.exports.update = function() {

};
