var Tweet = require('./Tweet.jsx');

var TwitterFeed = React.createClass({
  render: function(){
    return (
        <div className="twitter-feed">
          <h2 className="feed-title">Recent Tweets:</h2>
          {this.props.tweets.map(function(tweet){
            tweet = JSON.parse(tweet);
            return <Tweet key={tweet.timestamp} tweet={tweet} />
          })}
        </div>
      );
  }
});

module.exports = TwitterFeed;
