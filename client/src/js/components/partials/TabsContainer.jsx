var Tabs = require('react-simpletabs');
var TwitterChart = require('../DetailsView/DetailsModules/TwitterChart.jsx');
var TwitterFeed = require('../DetailsView/DetailsModules/TwitterFeed.jsx');
var FacebookChart = require('../DetailsView/DetailsModules/FacebookChart.jsx');
var InstagramChart = require('../DetailsView/DetailsModules/InstagramChart.jsx');
var InstagramFeed = require('../DetailsView/DetailsModules/InstagramFeed.jsx');
var NewsChart = require('../DetailsView/DetailsModules/NewsChart.jsx');
var NewsFeed = require('../DetailsView/DetailsModules/NewsFeed.jsx');

var TabsContainer = React.createClass({
	render: function() {
		var followers = this.props.details.twitter.followers;
		var followersChange = this.props.details.twitter.followerschange;

		/* Percentage output func */
		function percentageCalc(num) {
			if (num > 0) {
				num = num + '%';
			} else {
				num = Math.abs(num) + '%';
			}

			return num;
		};
		/* Separates numbers with commas */
		followersCount = followers.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		/* Calculates follower change percentage */
		followersChange = (followersChange / followers) * 100;
		followersChange = percentageCalc(followersChange.toFixed(4));
		
		var percentStyle = {
			color: '#4b5086'
		}
		return (
			<Tabs className="container" tabActive={2}>
				<Tabs.Panel title='Facebook'>
					<h2 className="chart-title">Hourly Facebook Score Trends</h2>
					<FacebookChart facebook={this.props.details.facebook} />
				</Tabs.Panel>
				<Tabs.Panel title='Twitter'>
				<h2 className="chart-title">Hourly Twitter Score Trends</h2>
					<TwitterChart twitter={this.props.details.twitter} />
					<div className="row twitter-info">
						<div className="col-md-6">
							<TwitterFeed twitter={this.props.details.twitter} />
						</div>
						<div className="col-md-6">
							<div className="twitter-breakdown">
								<div className="col-md-6">
									<div className="breakdown-counts">{followersCount} <span className="breakdown-counts__category">Followers</span></div>
								</div>
								<div className="col-md-6">
									<div style={percentStyle}>{followersChange}</div>
								</div>
							</div>
						</div>
					</div>
				</Tabs.Panel>
				<Tabs.Panel title='Instagram'>
					<h2 className="chart-title">Hourly Instagram Score Trends</h2>
					<InstagramChart instagram={this.props.details.instagram} />
					<InstagramFeed images={this.props.details.instagram} />
				</Tabs.Panel>
				<Tabs.Panel title='News'>
					<h2 className="chart-title">Appearance in News Headlines</h2>
					<NewsChart sites={this.props.details.sites} />
					<NewsFeed headlines={[1,2,3,4,5]} />
				</Tabs.Panel>
			</Tabs>
		);
	}
});

module.exports = TabsContainer;
