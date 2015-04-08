var ListItem = require('./ListItem.jsx');

var ListContainer = React.createClass({
  render: function(){
    var _this = this;
    return (
        <div className="list-container">
          <div className="container">
            <div className="a-list-container">
              <h2 className="list-container__title">A-List</h2>
              <ul className="people-list">
                {this.props.aList.map(function(person){
                  return <ListItem />
                  console.log('person!', person);
                })}
              </ul>
            </div>

            <div className="b-list-container">
              <h2 className="list-container__title">B-List</h2>
              <ul className="people-list">
            
              </ul>
            </div>

            <div className="c-list-container">
              <h2 className="list-container__title">C-List</h2>
              <ul className="people-list">
              </ul>
            </div>

            <div className="d-list-container">
              <h2 className="list-container__title">C-List</h2>
              <ul className="people-list">
              </ul>
            </div>
          </div>
         </div> 
      );
  }
});

module.exports = ListContainer;
