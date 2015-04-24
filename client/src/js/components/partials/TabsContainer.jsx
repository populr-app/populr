var Tabs = require('react-simpletabs');
var TwitterChart = require('../DetailsView/DetailsModules/TwitterChart.jsx');
var TwitterFeed = require('../DetailsView/DetailsModules/TwitterFeed.jsx');
var FacebookChart = require('../DetailsView/DetailsModules/FacebookChart.jsx');
var InstagramChart = require('../DetailsView/DetailsModules/InstagramChart.jsx');
var InstagramFeed = require('../DetailsView/DetailsModules/InstagramFeed.jsx');
var NewsChart = require('../DetailsView/DetailsModules/NewsChart.jsx');
var NewsFeed = require('../DetailsView/DetailsModules/NewsFeed.jsx');
var StatsBreakdown = require('./StatsBreakdown.jsx');

var TabsContainer = React.createClass({
  render: function() {
    /* Creates an array for chart labels X hours ago */
    var timeAgo = [
      moment().subtract('hour', 1).format('ha'),
      moment().subtract('hour', 2).format('ha'),
      moment().subtract('hour', 3).format('ha'),
      moment().subtract('hour', 4).format('ha'),
      moment().subtract('hour', 5).format('ha'),
      moment().subtract('hour', 6).format('ha'),
      moment().subtract('hour', 7).format('ha'),
      moment().subtract('hour', 8).format('ha'),
      moment().subtract('hour', 9).format('ha'),
      moment().subtract('hour', 10).format('ha'),
      moment().subtract('hour', 11).format('ha'),
      moment().subtract('hour', 12).format('ha'),
      moment().subtract('hour', 13).format('ha'),
      moment().subtract('hour', 14).format('ha'),
      moment().subtract('hour', 15).format('ha'),
      moment().subtract('hour', 16).format('ha'),
      moment().subtract('hour', 17).format('ha'),
      moment().subtract('hour', 18).format('ha'),
      moment().subtract('hour', 19).format('ha'),
      moment().subtract('hour', 20).format('ha'),
      moment().subtract('hour', 21).format('ha'),
      moment().subtract('hour', 22).format('ha'),
      moment().subtract('hour', 23).format('ha'),
      moment().subtract('hour', 24).format('ha')
    ];
    return (
      <Tabs className="container" tabActive={2}>
        <Tabs.Panel title='Facebook'>
          <h2 className="chart-title">Hourly Facebook Score Trends</h2>
          <FacebookChart facebook={this.props.details.facebook} timeAgo={timeAgo} />
          <div className="placeholder"></div>
        </Tabs.Panel>
        <Tabs.Panel title='Twitter'>
        <h2 className="chart-title">Hourly Twitter Score Trends</h2>
          <TwitterChart twitter={this.props.details.twitter} timeAgo={timeAgo}/>
          <div className="row twitter-info">
            <div className="col-md-6">
              <TwitterFeed twitter={this.props.details.twitter} />
            </div>
            <div className="col-md-6">
              <div className="stats-breakdown">
                <StatsBreakdown data={this.props.details.twitter} />
              </div>
            </div>
          </div>
        </Tabs.Panel>
        <Tabs.Panel title='News'>
          <h2 className="chart-title">Appearance in News Headlines</h2>
          <NewsChart sites={this.props.details.sites} timeAgo={timeAgo}/>
          <NewsFeed headlines={[1,2,3,4,5]} />
        </Tabs.Panel>
      </Tabs>
    );
  }
});

module.exports = TabsContainer;
