var instafeed = require('instafeed.js');

var InstagramFeed = React.createClass({
  componentWillReceiveProps: function(nextProps){
    if(nextProps.handle !== "") {
      !function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+"://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");
    }
  },
  render: function(){
    var url = 'https://twitter.com/' + this.props.handle;
    var handleString = this.props.handle + '';
    console.log('twit prop', this.props);
    return (<div>
        <a className="twitter-timeline" href={url} data-widget-id="586324073275265024" data-screen-name={handleString} >Tweets by @{this.props.handle}</a>
        </div>
      );
  }
});

module.exports = InstagramFeed;
