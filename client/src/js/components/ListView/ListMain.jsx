var ListHeader = require('./ListHeader.jsx');
var ListContainer = require('./ListContainer.jsx');
var PeopleStore = require('../../stores/PeopleStore.jsx');

var ListMain = React.createClass({
  getInitialState: function(){
    return { 
      aList: PeopleStore.getList("A"),
      bList: PeopleStore.getList("B"),
      cList: PeopleStore.getList("C"),
      dList: PeopleStore.getList("D"),
     };
  },
  render: function(){
    return (
        <div className="list-main">
          <ListHeader />
          <ListContainer 
            aList={this.state.aList}
            bList={this.state.bList}
            cList={this.state.cList}
            dList={this.state.dList}
          />
        </div>
      );
  }
});

module.exports = ListMain;
