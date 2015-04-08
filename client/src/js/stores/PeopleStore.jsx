var Reflux = require('reflux');
var PeopleActions = require('../actions/PeopleActions.jsx');

var _people = [];

var PeopleStore = Reflux.createStore({
  init: function() {
    this.listenTo(PeopleActions.loadComplete, this.onLoadComplete);
    // this.listenTo(PeopleActions.getPeopleList, this.getList)
  },

  onLoadComplete: function(data) {
    _people = data;
    this.trigger(_people);
  },

  getPeople: function() {
    return _people;
  },

  getList: function(letter) {
    // console.log(_people)
    return ({
      aList: _people.slice(0, 50),
      bList: _people.slice(51, 100),
      cList: _people.slice(101, 150),
      dList: _people.slice(151, 200)
    })

    // switch (letter){
    //   case 'A':
    //     return _people.slice(0, 49);
    //     break;
    //   case 'B':
    //     return _people.slice(50, 99);
    //     break;
    //   case 'C':
    //     return _people.slice(100, 149);
    //     break;
    //   case 'D':
    //     return _people.slice(150, 199);
    //     break;
    //   default:
    //     return _people.slice(0, 49);
    //     break;
    // }
  }
});

module.exports = PeopleStore;
