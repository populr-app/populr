var ListItem = require('./ListItem.jsx');

var ListContainer = React.createClass({
  render: function(){
    console.log(this.props.people);
    return (
        <div className="list-container">
          <div className="a-list-container">
            <h2>A-List</h2>
            <ul className="people-list">
              {this.props.aList.map(function(person) {
                return <ListItem key={person.rank} person={person} />
              })}
            </ul>
          </div>

          <div className="b-list-container">
            <h2>B-List</h2>
            <ul className="people-list">
              {this.props.bList.map(function(person) {
                return <ListItem key={person.rank} person={person} />
              })}
            </ul>
          </div>

          <div className="c-list-container">
            <h2>C-List</h2>
            <ul className="people-list">
              {this.props.cList.map(function(person) {
                return <ListItem key={person.rank} person={person} />
              })}
            </ul>
          </div>

          <div className="d-list-container">
            <h2>C-List</h2>
            <ul className="people-list">
              {this.props.dList.map(function(person) {
                return <ListItem key={person.rank} person={person} />
              })}
            </ul>
          </div>
         </div> 
      );
  }
});

module.exports = ListContainer;
