

var DetailsContainer = React.createClass({
  render: function(){
  	console.log('details', this.props);
    return (
        <div className="details-container">
        	<div className="container">
          	{this.props.details}
          </div>
        </div>
      );
  }
});

module.exports = DetailsContainer;
