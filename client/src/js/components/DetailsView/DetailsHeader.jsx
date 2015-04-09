var DetailsHeader = React.createClass({
  render: function(){
    return (
        <div className="details-header">
        	<div className="container">
          	<h1 className="details-header__name">{this.props.details.fullName}</h1>
          </div>
        </div>
      );
  }
});

module.exports = DetailsHeader;
