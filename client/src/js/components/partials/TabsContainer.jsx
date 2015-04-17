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
		return (
			<Tabs className="container" tabActive={2}>
				<Tabs.Panel title='Facebook'>
					<h2 className="chart-title">Hourly Facebook Score Trends</h2>
					<FacebookChart facebook={this.props.details.facebook} />
				</Tabs.Panel>
				<Tabs.Panel title='Twitter'>
				<h2 className="chart-title">Hourly Twitter Score Trends</h2>
					<TwitterChart twitter={this.props.details.twitter} />
					<TwitterFeed tweets={this.props.details.twitter.tweets} />
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
