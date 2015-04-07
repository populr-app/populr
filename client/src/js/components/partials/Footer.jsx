var Footer = React.createClass({
  getInitialState: function(){
    var year = new Date();
    return({year: year.getFullYear()})
  },
  render: function(){
    return (
      <footer className="footer">
        <span>&copy; {this.state.year} Populr.io</span>
      </footer>
      )
  }
});

module.exports = Footer;
