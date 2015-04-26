var NewsStatsBreakdown = React.createClass({
  render: function() {
    return (
      <div className="headlines-breakdown">
        <div className="col-md-12">
          <div className="breakdown-counts">
            <ul>
              <li>
                <span className="breakdown-counts__category">
                  Mentions in Headlines
                </span>
                {this.props.data.count}
                <div className={this.props.data.countchange > 0 ? 'percentChange percentChange-positive' : 'percentChange percentChange-negative'}>
                  <i className={this.props.data.countchange > 0 ? 'fa fa-caret-up' : 'fa fa-caret-down'} />{Math.abs((this.props.data.countchange/this.props.data.count)).toFixed(6) + '%'}
                </div>
              </li>
              <li>
                <span className="breakdown-counts__category">
                  News Score
                </span>
                {this.props.data.score}
                <div className={this.props.data.scorechange > 0 ? 'percentChange percentChange-positive' : 'percentChange percentChange-negative'}>
                  <i className={this.props.data.scorechange > 0 ? 'fa fa-caret-up' : 'fa fa-caret-down'} />{Math.abs((this.props.data.scorechange/this.props.data.score)).toFixed(6) + '%'}
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = NewsStatsBreakdown;