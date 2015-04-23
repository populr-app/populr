var StatsBreakdown = React.createClass({
  numCommaAdd: function(num) {
    num = num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return num;
  },
  render: function() {
    console.log(this.props.data);
    return (
      <div className="twitter-breakdown">
        <div className="col-md-12">
          <div className="breakdown-counts">
            <ul>
              <li>
                <span className="breakdown-counts__category">Followers</span>
                {this.numCommaAdd(this.props.data.followers)}
              </li>
              <li>
                <span className="breakdown-counts__category">Score</span>
                {this.numCommaAdd(this.props.data.score)}
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = StatsBreakdown;