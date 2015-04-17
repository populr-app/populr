var NewsFeed = React.createClass({
  render: function(){
    return (
        <div className="twitter-feed">
          <h2 className="feed-title">Recent Headlines:</h2>
          {this.props.headlines.map(function(headline){
            return headline;
          })}
        </div>
      );
  }
});

module.exports = NewsFeed;
