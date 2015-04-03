var ListHeader = require('./ListHeader.jsx');
var ListContainer = require('./ListContainer.jsx');

var ListMain = React.createClass({
  render: function(){
    return (
        <div className="list-main">
          <ListHeader />
          <ListContainer />
        </div>
      );
  }
});

module.exports = ListMain;
