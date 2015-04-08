

var DetailsContainer = React.createClass({
  render: function(){
    return (
        <div className="details-container">
          {this.props.details}
        </div>
      );
  }
});

module.exports = DetailsContainer;
