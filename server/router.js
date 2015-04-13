
/****************
  Server Router
****************/

/*
  Sets up the routing for the server, sending each
  API request to its associated controller
*/

/* * Imports * */

var topController = require('./database/top/controller');
var peopleController = require('./database/people/controller');
var twitterController = require('./database/twitter/controller');
var contextController = require('./database/context/controller');
var sitesController = require('./database/sites/controller');
var facebookController = require('./database/facebook/controller');

/* * API route directing * */

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

module.exports.twitter = function(app) {
  app.param('id', twitterController.attachParam);
  app.get('/:id', twitterController.get);
};

module.exports.context = function(app) {
  app.param('id', contextController.attachParam);
  app.get('/:id', contextController.get);
};

module.exports.sites = function(app) {
  app.param('id', sitesController.attachParam);
  app.get('/:id', sitesController.get);
};

module.exports.facebook = function(app) {
  app.param('id', facebookController.attachParam);
  app.get('/:id', facebookController.get);
};
