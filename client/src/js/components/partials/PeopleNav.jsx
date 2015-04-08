var PeopleNav = React.createClass({
	render: function() {
		return (
			<nav>
				<ul className="people-nav">
					<li className="people-nav--selected"><a href="#a-list">A-List</a></li>
					<li><a href="#b-list">B-List</a></li>
					<li><a href="#c-list">C-List</a></li>
					<li><a href="#d-list">D-List</a></li>
				</ul>
			</nav>
		);
	}
});

module.exports = PeopleNav;
