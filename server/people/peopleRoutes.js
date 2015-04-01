
// Express router for the people api endpoint

var aListController = require('./aListController.js');

module.exports = function(app) {
  app.route('/')
    .get(aListController);
};
