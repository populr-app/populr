var GoogleAnalytics = require('../partials/GoogleAnalytics.js');
var DetailsSidebar = require('../DetailsView/DetailsSidebar.jsx');
var AboutMain = require('./AboutMain.jsx');

var AboutView = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },
  render: function(){
    return (
        <div className="about-view">
          <DetailsSidebar />
          <AboutMain />
          <GoogleAnalytics />
        </div>
      );
  }
});

module.exports = AboutView;
