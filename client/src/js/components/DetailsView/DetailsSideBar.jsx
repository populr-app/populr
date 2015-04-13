var Logo = require('../partials/Logo.jsx');
var Footer = require('../partials/Footer.jsx');
var ViewNav = require('../partials/ViewNav.jsx');

var DetailsSidebar = React.createClass({
  render: function(){
    return (
        <div className="details-sidebar">
          <Logo />
          <ViewNav />
          <Footer />
        </div>
      );
  }
});

module.exports = DetailsSidebar;
