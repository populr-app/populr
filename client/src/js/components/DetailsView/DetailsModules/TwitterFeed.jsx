var Tweet = require('./Tweet.jsx');

var TwitterFeed = React.createClass({
  render: function(){
    return (
        <div className="twitter-feed">
          {this.props.tweets.map(function(tweet){
            tweet = JSON.stringify(tweet);
            return <Tweet key={tweet.timestamp} tweet={person} />
          })}
        </div>
      );
  }
});

module.exports = TwitterFeed;
