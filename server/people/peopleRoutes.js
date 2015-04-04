
// Express router for the people api endpoint

var peopleController = require('./peopleController.js');

module.exports = function(app) {
  app.route('/')
    .get(peopleController.query)
    .post(peopleController.add);
};
