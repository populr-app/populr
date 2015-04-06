var GoogleAnalytics = require('../partials/GoogleAnalytics.js');

var AboutView = React.createClass({
  render: function(){
    return (
        <div className="about-view">
          <h1> About </h1>
          <GoogleAnalytics />
        </div>
      );
  }
});

module.exports = AboutView;
