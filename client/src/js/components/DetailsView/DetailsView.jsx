var DetailsSidebar = require('./DetailsSideBar.jsx');
var DetailsMain = require('./DetailsMain.jsx');
var GoogleAnalytics = require('../partials/GoogleAnalytics.js');

var DetailsView = React.createClass({
  render: function(){
    return (
        <div className="details-view">
          <h1> Details </h1>
          <DetailsSidebar />
          <DetailsMain />
          <GoogleAnalytics />
        </div>
      );
  }
});

module.exports = DetailsView;
