var DetailsSidebar = require('./DetailsSideBar.jsx');
var DetailsMain = require('./DetailsMain.jsx');
var GoogleAnalytics = require('../partials/GoogleAnalytics.js');

var DetailsView = React.createClass({
  conrextTypes: {
    router: React.PropTypes.func
  },
  render: function(){
    return (
        <div className="details-view">
          <h1> Details </h1>
          <DetailsSidebar />
          <DetailsMain fullName={this.context.router.getCurrentParams().fullName} />
          <GoogleAnalytics />
        </div>
      );
  }
});

module.exports = DetailsView;
