var Reflux = require('reflux');
var DetailsActions = require('../actions/DetailsActions.jsx');

var _details = [];

var DetailsStore = Reflux.createStore({
  init: function() {
    this.listenTo(DetailsActions.loadComplete, this.onLoadComplete);
  },

  onLoadComplete: function(data){
    _details = data;
    this.trigger(_details);
  },

  getDetails: function(){
    return _details;
  }
});

module.exports = DetailsStore;

