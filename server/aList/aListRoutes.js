
// Express router for the aList api endpoint

var aListController = require('./aListController.js');

module.exports = function(app) {
  app.route('/')
    .get(aListController);
};
