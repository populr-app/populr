
// Express router for the top api endpoint

var topController = require('./topController.js');

module.exports = function(app) {
  app.route('/')
    .get(topController.top25);
};
