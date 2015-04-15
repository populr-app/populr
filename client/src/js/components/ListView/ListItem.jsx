var Link = require('react-router').Link;

var ListItem = React.createClass({
  render: function(){
    /* Inline styles that change colors depending on if the net score
    change property is larger or less than zero */
    var score = this.props.person.score;
    var scoreChange = this.props.person.scorechange;
    var scoreChangeColor = '';
    if (scoreChange > 0) {
      scoreChangeColor = '#27ae60';
    } else {
      scoreChangeColor = '#e74c3c';
    }
    var scoreChangeStyles = {
      netChange: {
        color: scoreChangeColor
      }
    }

    /* Calculate scorechange as a percentage */
    var scorePercentage = Math.floor((scoreChange / score) * 100);
    if (scorePercentage > 0) {
      scorePercentage = '+' + scorePercentage + '%';
    } else {
      scorePercentage = scorePercentage + '%';
    }

    /* Removes '_normal' in uri to retrieve larger Twitter picture */
    var profilePicture = this.props.person.profilePic;
    profilePicture = profilePicture.replace(/_normal/i, '');

    /* Adds 'player' to sports occupations' */
    var occupation = this.props.person.occupation;
    if (occupation === 'Soccer' || occupation === 'Basketball' || occupation === 'Football' || occupation === 'Tennis' || occupation=== 'Hockey') {
      this.props.person.occupation = occupation + ' Player';
    }
    return (
      <li className="person-item row">
        <div className="col-md-3 col-sm-4 col-xs-5">
          <div className="person-profile-picture">
            <img src={profilePicture} />
            <div className="person-rank-circle">
              <span className="person-rank">{this.props.person.rank}</span>
            </div>
          </div>
          <div className="person-info-wrapper">
            <div className="person-details">
              <Link to="details" params={this.props.person}>
                <span className="person-name">{this.props.person.fullName}</span>
                <span className="person-profession">{this.props.person.occupation || 'Celebrity'}</span>
              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-2 col-sm-2 col-xs-2">
          <span className="person-netChange" style={scoreChangeStyles.netChange}>{scorePercentage} change</span>
        </div>
        <div className="col-md-2 col-sm-2 col-xs-2">
          <span className="person-currentScore"></span>
        </div>
      </li>
    )
  }
});

module.exports = ListItem;
