var React = require('react');
var Router = require('react-router');


//Components


var App = React.createClass({
  render: function(){
    return (
        <div className="full">
          <h1>Welcome to Populr</h1>
        </div>
      );
  }
});

React.render(<App />, document.getElementById('app'));
