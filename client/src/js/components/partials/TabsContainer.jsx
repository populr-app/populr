var Tabs = require('react-simpletabs');
var TwitterChart = require('../DetailsView/DetailsModules/TwitterChart.jsx');
var TwitterFeed = require('../DetailsView/DetailsModules/TwitterFeed.jsx');
var FacebookChart = require('../DetailsView/DetailsModules/FacebookChart.jsx');
var InstagramChart = require('../DetailsView/DetailsModules/InstagramChart.jsx');
var InstagramFeed = require('../DetailsView/DetailsModules/InstagramFeed.jsx');

var TabsContainer = React.createClass({
	render: function() {
		return (
			<Tabs className="container" tabActive={2}>
				<Tabs.Panel title='Facebook'>
					<h2>Hourly Facebook Score Trends</h2>
					<FacebookChart facebook={this.props.details.facebook} />
				</Tabs.Panel>
				<Tabs.Panel title='Twitter'>
				<h2>Hourly Twitter Score Trends</h2>
					<TwitterChart twitter={this.props.details.twitter} />
					<TwitterFeed tweets={this.props.details.twitter.tweets} />
				</Tabs.Panel>
				<Tabs.Panel title='Instagram'>
					<h2>Hourly Instagram Score Trends</h2>
					<InstagramChart instagram={this.props.details.instagram} />
					<InstagramFeed images={this.props.details.instagram.images} />
				</Tabs.Panel>
			</Tabs>
		);
	}
});

module.exports = TabsContainer;