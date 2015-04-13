var TwitterFeed = React.createClass({
  componentWillReceiveProps: function(nextProps){
    if(nextProps.handle !== "") {
      !function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+"://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");
    }
  },
  componentWillUnmount: function(){
      this.refs.twitter-feed.remove();
  },
  render: function(){
    var url = 'https://twitter.com/' + this.props.handle;
    var handleString = this.props.handle + '';
    console.log('twit prop', this.props);
    return (
        <a className="twitter-timeline" href={url} ref="twitter-feed" data-widget-id="586324073275265024" data-screen-name={handleString} >Tweets by @{this.props.handle}</a>
      );
  }
});

module.exports = TwitterFeed;
