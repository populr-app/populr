var Reflux = require('reflux');

var PeopleActions = Reflux.createActions([
  'loadPeople',
  'loadComplete',
  ]);

PeopleActions.loadPeople.preEmit = function() {
  $.ajax({
        type: 'GET',
        url: '/api/top'
      }).done(function(data) {
        PeopleActions.loadComplete(data);
      });
}

module.exports = PeopleActions;
