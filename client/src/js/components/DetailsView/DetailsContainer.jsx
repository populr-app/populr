var DetailsSideBar = require('./DetailsSideBar.jsx');
var DetailsContainer = require('./DetailsContainer.jsx');

var DetailsContainer = React.createClass({
  render: function(){
    return (
        <div className="details-container">
          <DetailsSideBar />
          <DetailsContainer />
        </div>
      );
  }
});

module.exports = DetailsContainer;
