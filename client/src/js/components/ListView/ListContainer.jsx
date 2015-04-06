var ListContainer = React.createClass({
  render: function(){
    return (
        <div className="list-container">
          {this.props.people}
        </div>
      );
  }
});

module.exports = ListContainer;
