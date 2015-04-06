var Logo = require('../partials/Logo.jsx');
var Footer = require('../partials/Footer.jsx');

var DetailsSidebar = React.createClass({
  render: function(){
    return (
        <div className="details-sidebar">
          <Logo />
          <Footer />
        </div>
      );
  }
});

module.exports = DetailsSidebar;
