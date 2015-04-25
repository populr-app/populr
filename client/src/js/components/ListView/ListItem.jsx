var Link = require('react-router').Link;

var ListItem = React.createClass({
  render: function() {
    if (this.props.person.headlines.length) {
      console.log('headlines', JSON.parse(this.props.person.headlines[0]));
    }
    var headlines;
    var occupation = this.props.person.occupation;
    /* Inline styles that change colors depending on if the net score change property is larger or less than zero */
    var score = this.props.person.score;
    var scoreChange = this.props.person.scorechange;
    var scoreChangeColor = '';
    if (scoreChange > 0) {
      scoreChangeColor = '#4b5086';
    } else {
      scoreChangeColor = '#e48263';
    }

    /* Styles options object */
    var scoreChangeStyles = {
      netChange: {
        color: scoreChangeColor
      },
    }

    /* Calculate scorechange as a percentage */
    var scorePercentageCalc = Math.floor((scoreChange / score) * 100);

    var scorePercentage;
    if (scorePercentageCalc > 0) {
      scorePercentage = scorePercentageCalc + '%';
    } else {
      scorePercentage = Math.abs(scorePercentageCalc) + '%';
    }

    /* Removes '_normal' in uri to retrieve larger Twitter picture */
    var profilePicture = this.props.person.profilePic;
    profilePicture = profilePicture.replace(/_normal/i, '');

    if (this.props.person.headlines.length) {
      // headlines = this.props.person.headlines[0];
      headlines = JSON.parse(this.props.person.headlines[0]).title;
      headlinesURL = JSON.parse(this.props.person.headlines[0]).url;
    }
    return (
      <li className="person-item row">
        <div className="col-md-3 col-sm-8 col-xs-8">
          <div className="person-profile-picture">
            <Link to="details" params={this.props.person}>
              <img src={profilePicture} />
              <div className="person-rank-circle">
                <span className="person-rank">{this.props.person.rank}</span>
              </div>
            </Link>
          </div>
          <div className="person-info-wrapper">
            <div className="person-details">
              <Link to="details" params={this.props.person}>
                <span className="person-name">{this.props.person.fullName}</span>
                <span className={scorePercentageCalc > 60 ? 'person-trending' : 'hidden'}>Trending</span>
                <span className="person-profession">{this.props.person.occupation || 'Celebrity'}</span>
              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-2 col-sm-4 col-xs-4">
          <span className="person-netChange" style={scoreChangeStyles.netChange}><i className={scorePercentageCalc > 0 ? 'fa fa-caret-up' : 'fa fa-caret-down'}/> {scorePercentage} change</span>
        </div>
        <div className="col-md-7 col-sm-12 col-xs-12">
          <a href={headlinesURL} target="_blank" className="headlinesURL">
            <p className="headlines">{headlines}</p>
          </a>
        </div>
      </li>
    )
  }
});

module.exports = ListItem;
