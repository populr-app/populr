var NavBar = React.createClass({
  render: function(){
    return (
        <nav>
          <ul>
            <li>Populr</li>
            <li><a href="about">About</a></li>
            <li><a href="docs">Documentation</a></li>
          </ul>
        </nav>
      );
  }
});

module.exports = NavBar;
