var DetailsHeader = require('./DetailsHeader.jsx');
var DetailsContainer = require('./DetailsContainer.jsx');
var DetailsStore = require('../../stores/DetailsStore.jsx');
var DetailsActions = require('../../actions/DetailsActions.jsx');

var DetailsMain = React.createClass({
  getInitialState: function(){
    DetailsStore.listen(this.onDetailsChange);
    DetailsActions.loadDetails(this.props.fullName);
    
    return {
    details: {
        "id": "",
        "fullName": "",
        "score": 0,
        "scoreChange": 0,
        "createdAt": "",
        "updatedAt": "",
        "twitter": {
            "fullName": "",
            "score": 0,
            "scoreChange": 0,
            "handle": "",
            "twitterId": "",
            "profilePic": "",
            "backgroundPic": "",
            "followers": 0,
            "followersChange": 0,
            "createdAt": "",
            "updatedAt": ""
        },
        "context": {
            "fullName": "",
            "occupation": "",
            "dob": "",
            "description": "",
            "createdAt": "",
            "updatedAt": ""
        }
    }
}
  },
  onDetailsChange: function(data){
    this.setState({details: data});
  },
  render: function(){
    return (
        <div className="details-main">
          <DetailsHeader details={this.state.details} />
          <DetailsContainer details={this.state.details} />
        </div>
      );
  }
});

module.exports = DetailsMain;
