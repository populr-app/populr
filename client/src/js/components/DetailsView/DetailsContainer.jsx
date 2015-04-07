

var DetailsContainer = React.createClass({
  render: function(){
    return (
        <div className="details-container">
          {this.props.details.fullName}
        </div>
      );
  }
});

module.exports = DetailsContainer;
