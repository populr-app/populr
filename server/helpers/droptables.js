
var People = require('../database/people/model');
var Twitter = require('../database/twitter/model');
var Context = require('../database/context/model');
var Sites = require('../database/sites/model');
var Facebook = require('../database/facebook/model');
var Top = require('../database/top/model');

module.exports = function() {
  People.drop().then(function() {
    People.sync();
  });

  Twitter.drop().then(function() {
    Twitter.sync();
  });

  Context.drop().then(function() {
    Context.sync();
  });

  Sites.drop().then(function() {
    Sites.sync();
  });

  Facebook.drop().then(function() {
    Facebook.sync();
  });

  Top.drop().then(function() {
    Top.sync();
  });
};
