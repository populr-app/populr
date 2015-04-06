var GoogleAnalytics = require('../partials/GoogleAnalytics.js');

var DocsView = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },
  render: function(){
    return (
        <div className="docs-view">
          <h1> Documentation </h1>
          <GoogleAnalytics />
        </div>
      );
  }
});

module.exports = DocsView;
