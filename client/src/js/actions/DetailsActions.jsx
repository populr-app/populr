var Reflux = require('reflux');

var DetailsActions = Reflux.createActions([
  'loadDetails',
  'loadComplete'
  ]);

DetailsActions.loadDetails.preEmit = function(name) {
    $.ajax({
        type: 'GET',
        url: 'http://api.populr.io/people/' + escape(name)
      }).done(function(data) {
        data = JSON.parse(data);
        var tweets = [];
        //converts tweet strings to useable objects
        data.twitter.tweets.forEach(function(string, index){
          tweets[index] = JSON.parse(string);
        })
        data.twitter.tweets = tweets;
        DetailsActions.loadComplete(data);
      });
  }

module.exports = DetailsActions;
