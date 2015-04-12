var DetailsHeader = React.createClass({
  render: function() {
    if (this.props.details.twitter === undefined) {
      this.props.details.twitter = {
        backgroundPic: '',
        profilePic: ''
      };
      this.props.details.context = {
        occupation: ''
      };
    }

    if (this.props.details.top === undefined) {
      this.props.details.top = {
        rank: 0
      };
    }

    /* Adds an ordinal suffix to the rank number */
    var rank = this.props.details.top.rank;
    var rankSuffix = '';
    function ordinal_suffix_of(i) {
      var j = i % 10,
          k = i % 100;
      if (j == 1 && k != 11) {
          return i + "st";
      }
      if (j == 2 && k != 12) {
          return i + "nd";
      }
      if (j == 3 && k != 13) {
          return i + "rd";
      }
      return i + "th";
    }

    rankSuffix = ordinal_suffix_of(rank);

    /* Removes '_normal' in uri to retrieve larger Twitter picture */
    var profilePicture = this.props.details.twitter.profilePic;
    profilePicture = profilePicture.replace(/_normal/i, '');

    return (
        <div className="details-header">
        	<div className="container">
            <div className="details-header__top-personal inline">
              <div className="details-header__face inline">
                <img src={profilePicture}/>
              </div>
              <div className="inline">
                <h1 className="details-header__name">
                  {this.props.details.fullName}
                </h1>
                <h2 className="details-header__profession">
                  {this.props.details.context.occupation}
                </h2>
              </div>
            </div>
            <div className="details-header__rank inline">
              <span>Ranked {rankSuffix}</span>
            </div>
          </div>
        </div>
      );
  }
});

module.exports = DetailsHeader;
