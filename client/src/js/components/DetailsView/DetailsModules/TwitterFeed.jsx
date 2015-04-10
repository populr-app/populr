var TwitterFeed = React.createClass({
  render: function(){
    console.log(this.props.handle);
    var url = 'https://twitter.com/' + this.props.handle;
    var handleString = this.props.handle + '';
    !function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+"://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");
    return (<div>
      {this.props.url}
      {this.props.handleString}
        <a className="twitter-timeline" href={this.state.url} data-widget-id="586324073275265024" data-screen-name={this.state.handleString} >Tweets by @{this.props.handle}</a>
      </div>
      );
  }
});

module.exports = TwitterFeed;
