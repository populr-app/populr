var Logo = require('../partials/Logo.jsx');
var Footer = require('../partials/Footer.jsx');
var PeopleNav = require('../partials/PeopleNav.jsx');

var ListSideBar = React.createClass({
  render: function(){
    return (
        <div className="list-sidebar">
          <Logo />
          <PeopleNav />
          <Footer />
        </div>
      );
  }
});

module.exports = ListSideBar;

