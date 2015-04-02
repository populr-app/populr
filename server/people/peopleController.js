
// Controller for the people api route

var People = require('../database/people.js');

module.exports = {
  query: query
};

// query will send back the requested person's dataset
function query(req, res, next) {
  next();
}
