
// Controller for the people api route

var People = require('../database/people.js');
var Twitter = require('../database/twitter.js');

module.exports = {
  query: query,
  add: add
};

// query will send back the requested person's dataset
function query(req, res, next) {
  next();
}

function add(req, res, next){
  next();
}

