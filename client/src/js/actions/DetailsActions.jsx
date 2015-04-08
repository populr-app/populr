var Reflux = require('reflux');

var DetailsActions = Reflux.createActions([
  'loadDetails',
  'loadComplete'
  ]);

DetailsActions.loadDetails.preEmit = function(name) {
    $.ajax({
        type: 'GET',
        url: '/api/people/' + escape(name)
      }).done(function(data) {
        DetailsActions.loadComplete(data);
      });
  }

module.exports = DetailsActions;
