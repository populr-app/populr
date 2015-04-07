var PeopleNav = React.createClass({
	render: function() {
		return (
			<nav>
				<ul className="people-nav">
					<li className="people-nav--selected"><a href="#">A-List</a></li>
					<li><a href="#">B-List</a></li>
					<li><a href="#">C-List</a></li>
					<li><a href="#">D-List</a></li>
				</ul>
			</nav>
		);
	}
});

module.exports = PeopleNav;
