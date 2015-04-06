var Reflux = require('reflux');
var PeopleActions = require('../actions/PeopleActions.jsx');

var _people = [];

var PeopleStore = Reflux.createStore({
  init: function(){
    this.load();
    this.listenTo(PeopleActions.loadPeople, this.load);
  },
  load: function(){
    var context = this;
      $.ajax({
        type: "GET",
        url: '/api/top',
      }).done(function(data){
          console.log(data);
          _people = key.people; //push data to store
          context.trigger(_people);
      });
  },
  getPeople: function() {
    return _people;
  }
});

module.exports = PeopleStore;
