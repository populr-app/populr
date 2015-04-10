var TwitterFeed = require('./TwitterFeed.jsx');
var TwitterChart = require('./TwitterChart.jsx');

var TwitterContainer = React.createClass({
  render: function(){
    return (
        <div className="twitter-container">
          <TwitterFeed handle={this.props.twitter.handle} />
          <TwitterChart twitter={this.props.twitter} />
        </div>
      );
  }
});

module.exports = TwitterContainer;