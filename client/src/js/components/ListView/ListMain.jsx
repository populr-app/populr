var ListHeader = require('./ListHeader.jsx');
var ListContainer = require('./ListContainer.jsx');
var PeopleStore = require('../../stores/PeopleStore.jsx');

var ListMain = React.createClass({
  getInitialState: function(){
    return { people: PeopleStore.getPeople() };
  },
  render: function(){
    return (
        <div className="list-main">
          <ListHeader />
          <ListContainer people={this.state.people} />
        </div>
      );
  }
});

module.exports = ListMain;
