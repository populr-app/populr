var Logo = require('../partials/Logo.jsx');
var Footer = require('../partials/Footer.jsx');

var ListSideBar = React.createClass({
  render: function(){
    return (
        <div className="list-sidebar">
          <Logo />
          <Footer />
        </div>
      );
  }
});

module.exports = ListSideBar;

