var Link = require('react-router').Link;

var Logo = React.createClass({
  render: function(){
    return (
        <div className="logo">
        	<Link to="home">
          	<img src="../img/populr.svg" />
          </Link>
        </div>       
      );
  }
});

module.exports = Logo;
