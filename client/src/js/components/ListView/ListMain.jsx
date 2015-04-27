var ListHeader = require('./ListHeader.jsx');
var ListContainer = require('./ListContainer.jsx');
var PeopleStore = require('../../stores/PeopleStore.jsx');
var PeopleActions = require('../../actions/PeopleActions.jsx');

var ListMain = React.createClass({
  getInitialState: function() {
    return {
      aList: [],
      bList: [],
      cList: [],
      dList: [],
      updatedAt: ''
    };
  },
  componentWillMount: function() {
    this.unsubscribe = PeopleStore.listen(this.onPeopleChange);
    PeopleActions.loadPeople();
  },
  onPeopleChange: function(people) {
    this.setState({ 
        aList: people.a,
        bList: people.b,
        cList: people.c,
        dList: people.d,
        updatedAt: people.updatedAt
    });
  },

  render: function(){
    return (
      <div className="list-main">
        <ListHeader />
        <ListContainer
          updatedAt ={this.state.updatedAt} 
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
