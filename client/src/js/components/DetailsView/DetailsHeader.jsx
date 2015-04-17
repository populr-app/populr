var DetailsHeader = React.createClass({
  getInitialState: function(){
    return {
        rankSuffix: '1st',
        fullName: 'Celebrity Name',
        profilePicture: '',
        occupation: 'Celebrity',
        handle: ''
      }
  },
  componentWillReceiveProps: function(nextProps){
      /* Adds an ordinal suffix to the rank number */
      var rank = nextProps.details.top.rank;
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
      var profilePicture = nextProps.details.twitter.profilePic;
      profilePicture = profilePicture.replace(/_normal/i, '');

      var occupation = nextProps.details.context.occupation;

      this.setState({
        rankSuffix: rankSuffix,
        fullName: nextProps.details.fullName,
        profilePicture: profilePicture,
        occupation: occupation,
        twitterURL: 'http://twitter.com/' + nextProps.details.twitter.handle
      });
  },
  render: function() {
    return (
        <div className="details-header">
        	<div className="container">
            <div className="row">
              <div className="col-sm-10 col-xs-12">
                <div className="details-header__top-personal inline">
                  <div className="details-header__face inline">
                    <img src={this.state.profilePicture} />
                  </div>
                  <div className="inline">
                    <h1 className="details-header__name">
                      <a href={this.state.twitterURL} target="_blank">{this.state.fullName}</a>
                    </h1>
                    <h2 className="details-header__profession">
                      {this.state.occupation}
                    </h2>
                  </div>
                </div>
              </div>
              <div className="col-sm-2">
                <div className="details-header__rank inline">
                  <span>Ranked {this.state.rankSuffix} </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
  }
});

module.exports = DetailsHeader;
