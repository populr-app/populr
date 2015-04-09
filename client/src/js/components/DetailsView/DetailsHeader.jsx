var DetailsHeader = React.createClass({
  render: function() {
    if (this.props.details.twitter === undefined) {
      this.props.details.twitter = {
        backgroundPic: '',
        profilePic: ''
      };
    }
    var dynamicBackground = { 
      backgroundImage: 'url(' + this.props.details.twitter.backgroundPic + ')',
      backgroundSize: '100%',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center center'
    };

    /* Removes '_normal' in uri to retrieve larger Twitter picture */
    var profilePicture = this.props.details.twitter.profilePic;
    profilePicture = profilePicture.replace(/_normal/i, '');
    return (
        <div className="details-header">
        	<div className="container">
            <div className="details-header__top-wrapper">
              <div className="details-header__face inline">
                <img src={profilePicture}/>
              </div>
              <h1 className="details-header__name inline">
                {this.props.details.fullName}
              </h1>
            </div>
          </div>
        </div>
      );
  }
});

module.exports = DetailsHeader;
