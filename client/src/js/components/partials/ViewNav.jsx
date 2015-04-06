var Link = require('react-router').Link;
var ViewNav = React.createClass({
  render: function() {
    return (
      <nav>
        <ul>
          <li><Link to="app">List</Link></li>
          <li><Link to="about">About</Link></li>
          <li><Link to="docs">Docs</Link></li>
        </ul>
      </nav>
    );
  }
});

module.exports = ViewNav;
