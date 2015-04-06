var Footer = React.createClass({
  getInitialState: function(){
    var year = new Date();
    return({year: year.getFullYear()})
  },
  render: function(){
    return (
      <div className="footer">
        &copy; Copyright {this.state.year} | Populr.io 
      </div>
      )
  }
});

module.exports = Footer;
