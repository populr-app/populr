var ListSideBar = require('./ListSideBar.jsx');
var ListMain = require('./ListMain.jsx');
var PeopleStore = require('../../stores/PeopleStore.jsx');

var ListView = React.createClass({
  getInitialState: function(){
    return { people: PeopleStore.getPeople() };
  },
  render: function(){
    return (
        <div className="list-view">
          <ListSideBar />
          <ListMain />
        </div>
      );
  }
});

module.exports = ListView;
