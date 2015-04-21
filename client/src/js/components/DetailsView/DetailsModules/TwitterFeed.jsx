var Tweet = require('./Tweet.jsx');

var TwitterFeed = React.createClass({
  getDefaultProps: function() {
    return {
      tweets: [{
        text: ''
      }]
    };
  },
  render: function(){
    var $twitterFeed = $('.tweet');
    var tweets = this.props.tweets;

    /* Cycles through tweets, fades tweets in and out */
    if (tweets.length > 0) {
      var tickerFeed = function(index) {
        var tweet = JSON.parse(tweets[index]);
        var value, nextIndex;

        /* Replaces unicode characters */
        value = tweet.text.replace(/&amp;/g, '&').replace(/&lt;/, '<').replace(/&gt;/, '>');

        $twitterFeed.fadeOut(function() {
          $(this).html(value).fadeIn();
        });

        nextIndex = (index+1) % tweets.length;

        /* Prevents recursive function from running if tweets length is less than 1 */
        if (tweets.length > 1) {
          setTimeout(function() {
            tickerFeed(nextIndex);
          }, 3000);
        }
      }
      tickerFeed(0);
    }

    return (
        <div className="twitter-feed-container">
          <i className="fa fa-twitter"/>
          <div className="twitter-feed__ticker">
            <div className="tweet"></div>
          </div>
        </div>
      );
  }
});

module.exports = TwitterFeed;
