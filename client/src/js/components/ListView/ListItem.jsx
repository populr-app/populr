var Link = require('react-router').Link;

var ListItem = React.createClass({
  render: function(){
    return (
      <Link to="details" params={this.props.person}>
        <li className="person-item">
          <span className="person-rank">{this.props.person.rank}</span>
          <span className="person-name">{this.props.person.fullName}</span>
          <span className="person-score">{this.props.person.score}</span>
          <span className="person-last-score">{this.props.person.lastScore}</span>
          <span className="person-last-rank">{this.props.person.lastRank}</span>
        </li>
      </Link>  
      )
  }
});

module.exports = ListItem;
