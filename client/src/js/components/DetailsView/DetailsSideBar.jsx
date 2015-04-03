var Logo = require('../partials/Logo.jsx');

var DetailsSidebar = React.createClass({
  render: function(){
    return (
        <div className="details-sidebar">
          <Logo />
        </div>
      );
  }
});

module.exports = DetailsSidebar;
