
// Controller for the top api route

var Top = require('../database/top.js');

module.exports = {
  top25: top25,
};

// top25 will send the top 25 weighted influences back to the client
function top25(req, res, next) {
  res.send();
}
