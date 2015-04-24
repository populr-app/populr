var AboutHeader = require('./AboutHeader.jsx');
var AboutContainer = require('./AboutContainer.jsx');

var AboutMain = React.createClass({
	render: function() {
		return (
			<div className="about-main">
				<AboutContainer />
			</div>
		)
	}
})

module.exports = AboutMain;
