
var redis = require('then-redis');
var Promise = require('bluebird');
var Top = require('../database/top/model');
var peopleController = require('../database/people/controller');
var twitterController = require('../database/twitter/controller');
var contextController = require('../database/context/controller');
var sitesController = require('../database/sites/controller');
var facebookController = require('../database/facebook/controller');
var topController = require('../database/top/controller');
var client = redis.createClient({
  host: process.env.REDISCLOUD_URL || '',
  port: '15340',
  password: process.env.REDISCLOUD_PASSWORD || ''
});

module.exports = function() {
  return Top.findAll({order: 'rank ASC'}).then(function(data) {
      lists = {a: [], b: [], c: [], d: [], all: []};
      var promiseArray = [];
      data.forEach(function(person, index) {
        person = person.get();
        lists.all.push(person);
        if (index <= 49) lists.a.push(person);
        else if (index <= 99) lists.b.push(person);
        else if (index <= 149) lists.c.push(person);
        else lists.d.push(person);

        promiseArray.push(peopleController.query(person.fullName)
          .then(twitterController.attachData)
          .then(contextController.attachData)
          .then(sitesController.attachData)
          .then(facebookController.attachData)
          .then(topController.attachData)
          .then(function(data) {
            return client.set(data.fullName, JSON.stringify(data));
          }));
      });

      return Promise.all(promiseArray).then(function() {
        return lists;
      });
    }).then(function(lists) {
      var all = Array.prototype.slice.call(lists.all);
      delete lists.all;
      return client.set('top', JSON.stringify(lists))
        .then(function() {
          return client.set('top.a', JSON.stringify(lists.b));
        }).then(function() {
          return client.set('top.b', JSON.stringify(lists.b));
        }).then(function() {
          return client.set('top.c', JSON.stringify(lists.c));
        }).then(function() {
          return client.set('top.d', JSON.stringify(lists.d));
        }).then(function() {
          return client.set('top.all', JSON.stringify(all));
        }).then(function() {
          return client.quit();
        });
    });
};
