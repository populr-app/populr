var Reflux = require('reflux');
var DetailsActions = require('../actions/DetailsActions.jsx');

var _details = [];

var DetailsStore = Reflux.createStore({
  init: function(){
    this.listenTo(DetailsActions.loadDetails, this.load);
  },
  load: function(name){
    var context = this;
      $.ajax({
        type: "GET",
        url: '/api/people/' + name,
      }).done(function(data){
          console.log(data);
          _details = data; //push data to store
          context.trigger(_details);
      });
      return _details;
  }
});

module.exports = DetailsStore;  
