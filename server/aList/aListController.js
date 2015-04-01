
// Controller for the aList api route

var AList = require('./aListModel.js');

module.exports = {
  top25: top25,
  search: search
};

// top25 will send the top 25 weighted influences back to the client
function top25(req, res, next) {
  next();
}

// Potentially a future feature, but will maybe fuzzy query the
// database and send back the results
function search(req, res, next) {
  next();
}
