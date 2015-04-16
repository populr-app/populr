var Reflux = require('reflux');

var PeopleActions = Reflux.createActions([
  'loadPeople',
  'loadComplete',
  ]);

PeopleActions.loadPeople.preEmit = function() {
  $.ajax({
        type: 'GET',
        url: 'http://api.populr.io/top'
      }).done(function(data) {
        data = JSON.parse(data);
        PeopleActions.loadComplete(data);
      });
}

module.exports = PeopleActions;
