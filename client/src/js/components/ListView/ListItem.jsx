var ListItem = React.createClass({
  render: function(){
    return (
        <li className="person-item">
          <span className="person-rank">{this.props.person.rank}</span>
          <span className="person-last-rank">{this.props.person.lastRank}</span>
          <span className="person-">{this.props.person.fullName}</span>
          <span className="person-score">{this.props.person.score}</span>
          <span className="person-last-score">{this.props.person.lastScore}</span>
        </li>
      )
  }
});

module.exports = ListItem;
