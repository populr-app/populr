var Tabs = require('react-simpletabs');
var TwitterContainer = require('../DetailsView/DetailsModules/TwitterContainer.jsx');
var TwitterChart = require('../DetailsView/DetailsModules/TwitterChart.jsx');

var TabsContainer = React.createClass({
	render: function() {
		return (
			<Tabs className="container" tabActive={2}>
				<Tabs.Panel title='Facebook'>
					<h2>Content shizz</h2>
				</Tabs.Panel>
				<Tabs.Panel title='Twitter'>
					<TwitterChart />
				</Tabs.Panel>
				<Tabs.Panel title='Instagram'>
					<h2>Content Instagram</h2>
				</Tabs.Panel>
			</Tabs>
		);
	}
});

module.exports = TabsContainer;