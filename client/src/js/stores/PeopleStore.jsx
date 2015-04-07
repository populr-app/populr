var Reflux = require('reflux');
var PeopleActions = require('../actions/PeopleActions.jsx');

var _people = require('../../../../clientData.json').people;

var PeopleStore = Reflux.createStore({
  init: function(){
    // this.load();
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
  },
  getList: function(letter){
    switch(letter){
      case "A":
        return _people.slice(0, 49);
        break;
      case "B":
        return _people.slice(50, 99);
        break;
      case "C":
        return _people.slice(100, 149);
        break;
      case "D":
        return _people.slice(150, 199);
        break;
      default:
        return _people.slice(0, 49);
        break;
    }
  }
});

module.exports = PeopleStore;
