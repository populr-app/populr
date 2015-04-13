var TwitterFeed = require('./TwitterFeed.jsx');
var TwitterChart = require('./TwitterChart.jsx');

var TwitterContainer = React.createClass({
  render: function(){
    return (
        <div className="social-container container">
        	<div className="social-module social-module-chart">
          	<TwitterChart twitter={this.props.twitter} />
          </div>
          <div className="social-module social-module-feed">
          	<TwitterFeed handle={this.props.twitter.handle} />
          </div>
        </div>
      );
  }
});

module.exports = TwitterContainer;