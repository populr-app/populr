var DetailsHeader = require('./DetailsHeader.jsx');
var DetailsContainer = require('./DetailsContainer.jsx');
var DetailsStore = require('../../stores/DetailsStore.jsx');
var DetailsActions = require('../../actions/DetailsActions.jsx');

var DetailsMain = React.createClass({
  getInitialState: function(){
    return {details: {}}
  },
  componentWillMount: function(){
    DetailsStore.listen(this.onDetailsChange);
    DetailsActions.loadDetails(this.props.fullName);
  },
  onDetailsChange: function(data){
    this.setState({details: data});
  },
  render: function(){
    return (
        <div className="details-main">
          <DetailsHeader details={this.state.details} />
          <DetailsContainer details={this.state.details}  />
        </div>
      );
  }
});

module.exports = DetailsMain;
