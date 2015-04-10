var TwitterContainer = require('./DetailsModules/TwitterContainer.jsx');

var DetailsContainer = React.createClass({
  render: function(){
       return (
        <div className="details-container">
          <div className="description">
            {this.props.details.context.description}
          </div>
          <TwitterContainer twitter={this.props.details.twitter} />
        </div>
      );
  }
});

module.exports = DetailsContainer;
