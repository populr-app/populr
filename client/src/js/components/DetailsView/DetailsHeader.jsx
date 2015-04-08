var DetailsHeader = React.createClass({
  render: function(){
    return (
        <div className="details-header">
          <h1>{this.props.details.fullName}</h1>
        </div>
      );
  }
});

module.exports = DetailsHeader;
