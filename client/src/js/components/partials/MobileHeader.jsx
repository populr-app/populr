var Logo = require('./Logo.jsx');

var MobileHeader = React.createClass({
	render: function() {
		return (
			<div className="mobile-header">
				<Logo />
			</div>
		);
	}
});

module.exports = MobileHeader;