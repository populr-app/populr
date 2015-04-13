var Link = require('react-router').Link;

var ListItem = React.createClass({
  render: function(){
    /* Inline styles that change colors depending on if the net score
    change property is larger or less than zero */
    var score = this.props.person.score;
    var scoreChange = this.props.person.scorechange;
    var scoreChangeColor = '';
    if (scoreChange > 0) {
      scoreChangeColor = '#49C57D';
    } else {
      scoreChangeColor = '#EE6883';
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
    console.log(this.props.person);
    return (
      <li className="person-item row">
        <div className="col-md-3 col-sm-4 col-xs-5">
          <div className="person-rank-circle">
            <span className="person-rank">{this.props.person.rank}</span>
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
          <span className="person-netChange" style={scoreChangeStyles.netChange}><i className="fa fa-caret-up" />{scorePercentage}</span>
        </div>
      </li>
    )
  }
});

module.exports = ListItem;
