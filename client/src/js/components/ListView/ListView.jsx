var ListSideBar = require('./ListSideBar.jsx');
var ListMain = require('./ListMain.jsx');

var ListView = React.createClass({
  render: function(){
    return (
        <div className="list-view">
          <h1> List </h1>
          <ListSideBar />
          <ListMain />
        </div>
      );
  }
});

module.exports = ListView;
