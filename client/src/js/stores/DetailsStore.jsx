var Reflux = require('reflux');
var DetailsActions = require('../actions/DetailsActions.jsx');

var _details = [];

var PeopleStore = Reflux.createStore({
  init: function(){
    this.load();
    this.listenTo(DetailsActions.loadDetails, this.load);
  },
  load: function(){
    var context = this;
      $.ajax({
        type: "GET",
        url: '/api/people/' + ,
      }).done(function(data){
          console.log(data);
          _details = data; //push data to store
          context.trigger(_details);
      });
  }
});

module.exports = DetailsStore;  
