var DetailsHeader = require('./DetailsHeader.jsx');
var DetailsContainer = require('./DetailsContainer.jsx');
var DetailsStore = require('../../stores/DetailsStore.jsx');

var DetailsMain = React.createClass({
  getInitialState: function(){
    return {details: DetailsStore.load(this.props.fullName)}
  },
  render: function(){
    return (
        <div className="details-main">
          <DetailsHeader />
          <DetailsContainer details={this.state.details}  />
        </div>
      );
  }
});

module.exports = DetailsMain;
