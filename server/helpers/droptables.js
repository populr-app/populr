
var People = require('../database/people/model');
var Twitter = require('../database/twitter/model');
var Context = require('../database/context/model');
var Sites = require('../database/sites/model');
var Facebook = require('../database/facebook/model');
var Top = require('../database/top/model');

module.exports = function() {
  People.drop()
    .then(function() {
      return People.sync();
    })
    .then(function() {
      return Twitter.drop();
    })
    .then(function() {
      return Twitter.sync();
    })
    .then(function() {
      return Context.drop();
    })
    .then(function() {
      return Context.sync();
    })
    .then(function() {
      return Sites.drop();
    })
    .then(function() {
      return Sites.sync();
    })
    .then(function() {
      return Facebook.drop();
    })
    .then(function() {
      return Facebook.sync();
    })
    .then(function() {
      return Top.drop();
    })
    .then(function() {
      return Top.sync();
    })
    .then(function() {
      process.exit();
    });
};
