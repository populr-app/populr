var TwitterFeed = React.createClass({
  getInitialState: function() {
    return {tweets: this.props.twitter.tweets};
  },
  componentWillReceiveProps: function(nextProps){
    this.setState({tweets: nextProps.twitter.tweets})
  },
  componentDidMount: function(){
    this.changeTweet();
  },
  changeTweet: function(){
    var _this = this;
    var $twitterFeed = $('.tweet');
    /* Cycles through tweets, fades tweets in and out */
    if (this.state.tweets.length > 0) {
      var tickerFeed = function(index) {
        var tweet = _this.state.tweets[index];
        var value, nextIndex;

        /* Replaces unicode characters */
        value = tweet.text.replace(/&amp;/g, '&').replace(/&lt;/, '<').replace(/&gt;/, '>');

        $twitterFeed.fadeOut(function() {
          $(this).html(value).fadeIn();
        });

        nextIndex = (index+1) % _this.state.tweets.length;
        /* Prevents recursive function from running if tweets length is less than 1 */
        if (_this.state.tweets.length > 1) {
          setTimeout(function() {
            tickerFeed(nextIndex);
          }, 3600);
        }
      }
      tickerFeed(0);
    }
  },
  render: function(){
    this.changeTweet();
    return (
        <div className="twitter-feed-container">
          <i className="fa fa-twitter"/>
          <div className="twitter-feed__ticker">
            <div className="twitter-feed__username">
              <a href={'http://twitter.com/' + this.props.twitter.handle} target="_blank">
                {'@' + this.props.twitter.handle}
              </a>
            </div>
            <div className="tweet"></div>
          </div>
        </div>
      );
  }
});

module.exports = TwitterFeed;
