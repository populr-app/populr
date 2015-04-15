var ListItem = require('./ListItem.jsx');

var ListContainer = React.createClass({

  render: function(){
    var _this = this;
    return (
        <div className="list-container">
          <div className="container">
            <span className="last-updated">Updated Every 15 Minutes</span>
            <div id="a-list" className="list-container__section">
              <div className="list-container--title-wrapper">
                <h2 className="list-container__title">A-List</h2>
              </div>
              <ul className="people-list">
              {this.props.aList.map(function(person){
                return <ListItem key={person.fullName} person={person} />
              })}
              </ul>
            </div>

            <div id="b-list" className="list-container__section">
              <div className="list-container--title-wrapper">
                <h2 className="list-container__title">B-List</h2>
              </div>
              <ul className="people-list">
                {this.props.bList.map(function(person){
                  return <ListItem key={person.fullName} person={person} />
                })}
              </ul>
            </div>

            <div id="c-list" className="list-container__section">
              <div className="list-container--title-wrapper">
                <h2 className="list-container__title">C-List</h2>
              </div>
              <ul className="people-list">
                {this.props.cList.map(function(person){
                  return <ListItem key={person.fullName} person={person} />
                })}
              </ul>
            </div>

            <div id="d-list" className="list-container__section">
              <div className="list-container--title-wrapper">
                <h2 className="list-container__title">D-List</h2>
              </div>
              <ul className="people-list">
                {this.props.dList.map(function(person){
                  return <ListItem key={person.fullName} person={person} />
                })}
              </ul>
            </div>
          </div>
         </div> 
      );
  }
});

module.exports = ListContainer;
