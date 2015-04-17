
var Promise = require('bluebird');
var People = require('../database/people/model');
var twitterController = require('../database/twitter/controller');
var contextController = require('../database/context/controller');
var sitesController = require('../database/sites/controller');
var facebookController = require('../database/facebook/controller');
var topController = require('../database/top/controller');
var fs = require('fs-utils');

module.exports = function() {
  return People.findAll()
    .then(function(data) {
      var promiseArray = [];
      data.forEach(function(person) {
        promiseArray.push(twitterController.attachData(person.get())
          .then(contextController.attachData)
          .then(sitesController.attachData)
          .then(facebookController.attachData)
          .then(topController.attachData));
      });

      return Promise.all(promiseArray);
    }).then(function(data) {
      fs.writeJSONSync('./data/backup.json', {people: data});
    });
};

module.exports();