var Reflux = require('reflux');
var DetailsActions = require('../actions/DetailsActions.jsx');

var _details = [];

var DetailsStore = Reflux.createStore({
  init: function() {
    this.listenTo(DetailsActions.loadDetails, this.load);
  },

  load: function(name) {
    var _this = this;
    $.ajax({
        type: 'GET',
        url: '/api/people/' + name
      }).done(function(data) {
        console.log(data);
        _details = data;
        _this.trigger(_details);
      });

    return _details;
  }
});

module.exports = DetailsStore;

