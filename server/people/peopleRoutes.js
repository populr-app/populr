
// Express router for the people api endpoint

var peopleController = require('./peopleController.js');

module.exports = function(app) {
  app.param('id', peopleController.attach);
  app.post('/', peopleController.add);
  app.get('/:id', peopleController.query);
};
