var NewsFeed = React.createClass({
  getInitialState: function() {
    return {headlines: this.props.sites.headlines};
  },
  componentWillReceiveProps: function(nextProps) {
    this.setState({headlines: nextProps.sites.headlines})
  },
  componentDidMount: function() {
    this.changeHeadline();
  },
  changeHeadline: function() {
    var _this = this;
    var $headlineFeed = $('.headline');
    /* Cycles through headlines, fades headlines in and out */
    if (this.state.headlines.length > 0) {
      var tickerFeed = function(index) {
        var headlineDate = moment(JSON.parse(_this.state.headlines[index]).date).fromNow();
        var headlineURL = JSON.parse(_this.state.headlines[index]).url;

        var headline = '<a href="' + headlineURL + '" target="_blank">' + JSON.parse(_this.state.headlines[index]).title + '<div class="headline-date">' + headlineDate + '</div>' + '</a>';
        var nextIndex;

        $headlineFeed.fadeOut(function() {
          $(this).html(headline).fadeIn();
        });

        nextIndex = (index+1) % _this.state.headlines.length;
        /* Prevents recursive function from running if headlines length is less than 1 */
        if (_this.state.headlines.length > 1) {
          setTimeout(function() {
            tickerFeed(nextIndex);
          }, 3600);
        }
      }
      tickerFeed(0);
    } else {
      var sadFace = 'No recent headlines' + '<i class="twa twa-2x twa-sob" />';
      $headlineFeed.html(sadFace);
    }
  },
  render: function() {
    this.changeHeadline();
    return (
      <div className="headline-feed-container">
        <div className="headline-feed__ticker">
          <i className="fa fa-newspaper-o" />
            <div className="headline"></div>
        </div>
      </div>    
    );
  }
});

module.exports = NewsFeed;
