var Reflux = require('reflux');
var PeopleActions = require('../actions/PeopleActions.jsx');

var _people = [];

var PeopleStore = Reflux.createStore({
  init: function() {
    this.listenTo(PeopleActions.loadComplete, this.onLoadComplete);
  },

  onLoadComplete: function(data) {
    _people = data;
    this.trigger(_people);
  },

  getPeople: function() {
    return _people;
  }
});

module.exports = PeopleStore;
