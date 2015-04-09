var PeopleNav = React.createClass({
	render: function() {
		return (
			<nav>
				<ul className="people-nav">
					<a href="#a-list"><li className="people-nav--selected">A-List</li></a>
					<a href="#b-list"><li>B-List</li></a>
					<a href="#c-list"><li>C-List</li></a>
					<a href="#d-list"><li>D-List</li></a>
				</ul>
			</nav>
		);
	}
});

module.exports = PeopleNav;
