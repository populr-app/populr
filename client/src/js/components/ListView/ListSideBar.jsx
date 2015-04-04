var Logo = require('../partials/Logo.jsx');

var ListSideBar = React.createClass({
  render: function(){
    return (
        <div className="list-sidebar">
          <Logo />
        </div>
      );
  }
});

module.exports = ListSideBar;

