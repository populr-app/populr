var InstragramFeed = require('./InstagramFeed.jsx');
var InstagramChart = require('./TwitterChart.jsx');

var InstagramContainer = React.createClass({
  render: function(){
    return (
        <div className="twitter-container">
          <TwitterFeed handle={this.props.twitter.handle} />
          <TwitterChart twitter={this.props.twitter} />
        </div>
      );
  }
});

module.exports = InstagramContainer;