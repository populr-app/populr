var Logo = require('../partials/Logo.jsx');

var ListSideBar = React.createClass({
  render: function(){
    return (
        <div className="list-side-bar">
          <Logo />
        </div>
      );
  }
});

module.exports = ListSideBar;
