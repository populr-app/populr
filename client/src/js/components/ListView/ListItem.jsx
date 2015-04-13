var Link = require('react-router').Link;

var ListItem = React.createClass({
  render: function(){
    console.log(this.props.person)
    return (
      <li className="person-item">
        <div className="person-rank-circle">
          <span className="person-rank">{this.props.person.rank}</span>
        </div>
        <div className="person-info-wrapper">
        <div className="person-details">
          <Link to="details" params={this.props.person}>
            <span className="person-name">{this.props.person.fullName}</span>
            <span className="person-profession">{this.props.person.occupation}</span>
            <span className="person-score">{this.props.person.score}</span>
            <span className="person-score-change">{this.props.person.scorechange}</span>
          </Link>
        </div>
        </div>
      </li>
    )
  }
});

module.exports = ListItem;
