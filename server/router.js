
var topController = require('./database/top/controller');
var peopleController = require('./database/people/controller');
var twitterController = require('./database/twitter/controller');
var wikipediaController = require('./database/wikipedia/controller');

module.exports.top = function(app) {

};

module.exports.people = function(app) {
  app.get('/:id', peopleController.get);
  app.param('id', peopleController.attach);
  app.post('/', peopleController.post);
};

module.exports.twitter = function(app) {

};

module.exports.wikipedia = function(app) {

};
