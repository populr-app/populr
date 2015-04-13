var Link = require('react-router').Link;

var ListItem = React.createClass({
  render: function(){
    /* Inline styles that change colors depending on if the net score
    change property is larger or less than zero */
    var scoreChange = this.props.person.scorechange;
    var scoreChangeColor = '';
    if (scoreChange > 0) {
      scoreChangeColor = 'green';
    } else {
      scoreChangeColor = 'red';
    }
    var scoreChangeStyles = {
      netChange: {
        color: scoreChangeColor
      }
    }
    return (
      <li className="person-item">
        <div className="person-rank-circle">
          <span className="person-rank">{this.props.person.rank}</span>
        </div>
        <div className="person-info-wrapper">
          <div className="person-details">
            <Link to="details" params={this.props.person}>
              <span className="person-name">{this.props.person.fullName}</span>
              <span className="person-profession">Profession</span>
            </Link>
          </div>
          <span className="person-netChange" style={scoreChangeStyles.netChange}><i className="fa fa-caret-up" />+{this.props.person.scorechange}</span>
        </div>
      </li>
    )
  }
});

module.exports = ListItem;
