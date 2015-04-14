var Tweet = require('./Tweet.jsx');

var TwitterFeed = React.createClass({
  render: function(){
          // {this.props.tweets.map(function(tweet){
          //   tweet = JSON.stringify(tweet);
          //   return <Tweet key={tweet.timestamp} tweet={person} />
          // })}
    return (
        <div className="twitter-feed">
        </div>
      );
  }
});

module.exports = TwitterFeed;
