var emoji = require('emoji');

var Tweet = React.createClass({
  render: function(){
  	/* decodes characters using replace and regex */
    return (
        <div className="tweet">
          <span className="tweet-timestamp">{this.props.tweet.created_at}</span>
          <span className="tweet-body">{this.props.tweet.text}</span>
          <span className="tweet-handle">@{this.props.tweet.screen_name}</span>
        </div>
      );
  }
});

module.exports = Tweet;