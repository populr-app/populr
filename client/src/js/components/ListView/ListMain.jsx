var ListHeader = require('./ListHeader.jsx');
var ListContainer = require('./ListContainer.jsx');
var PeopleStore = require('../../stores/PeopleStore.jsx');
var PeopleActions = require('../../actions/PeopleActions.jsx');

var ListMain = React.createClass({
  componentWillMount: function(){
    PeopleStore.listen(this.onPeopleChange);
    PeopleActions.loadPeople();
    console.log('comp', this.state);
  },

  onPeopleChange: function(people){
    this.setState({
      aList: people.a,
      bList: people.b,
      cList: people.c,
      dList: people.d,
      });
  },

  render: function(){
    console.log(this.state)
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
