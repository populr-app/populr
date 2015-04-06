var ListSideBar = require('./ListSideBar.jsx');
var ListMain = require('./ListMain.jsx');
var PeopleStore = require('../../stores/PeopleStore.jsx');
var GoogleAnalytics = require('../partials/GoogleAnalytics.js');

var ListView = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },
  getInitialState: function(){
    return { people: PeopleStore.getPeople() };
  },
  render: function(){
    return (
        <div className="list-view">
          <ListSideBar />
          <ListMain />
          <GoogleAnalytics />
        </div>
      );
  }
});

module.exports = ListView;
