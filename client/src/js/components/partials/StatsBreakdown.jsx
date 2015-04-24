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
                <div className={this.props.data.followerschange > 0 ? 'percentChange percentChange-positive' : 'percentChange percentChange-negative'}>
                  <i className={this.props.data.followerschange > 0 ? 'fa fa-caret-up' : 'fa fa-caret-down'} />{Math.abs((this.props.data.followerschange/this.props.data.followers)).toFixed(6) + '%'}
                </div>
              </li>
              <li>
                <span className="breakdown-counts__category">Twitter Score</span>
                {this.numCommaAdd(this.props.data.score)}
                <div className={this.props.data.followerschange > 0 ? 'percentChange percentChange-positive' : 'percentChange percentChange-negative'}>
                  <i className={this.props.data.score > 0 ? 'fa fa-caret-up' : 'fa fa-caret-down'} />{Math.abs((this.props.data.scorechange/this.props.data.score)).toFixed(6) + '%'}
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = StatsBreakdown;