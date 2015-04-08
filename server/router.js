
// Declaring the controllers
var topController = require('./database/top/controller');
var peopleController = require('./database/people/controller');
var twitterController = require('./database/twitter/controller');
var wikipediaController = require('./database/wikipedia/controller');

// Directing the given routes to the correct controllers
module.exports.top = function(app) {
  app.param('id', topController.attachParam);
  app.get('/:id', topController.get);
  app.get('/', topController.get);
};

module.exports.people = function(app) {
  app.param('id', peopleController.attachParam);
  app.get('/:id', peopleController.get);
  app.post('/', peopleController.post);
};

// Here for maybe future implementation?
module.exports.twitter = function(app) {
};

module.exports.wikipedia = function(app) {
};
