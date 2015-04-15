var TabsContainer = require('../partials/TabsContainer.jsx');
var DetailsContainer = React.createClass({
  render: function(){
    if (this.props.details.context.description === undefined) {
      this.props.details.context = {
        description: ''
      };
    }

    /* Sets a max number of words in a paragraph for Wikipedia bio */
    var bio = this.props.details.context.description.split(' ');
    var bioLength = bio.length;
    var trimmedString = bio.splice(0, 140).join(' ');

    /* Dynamic Wikipedia URL */
    var wikiURI = 'http://en.wikipedia.org/wiki/' + this.props.details.fullName;

     return (
      <div className="details-container">
        <div className="wikipedia-bio">
          <div className="container">
            <h3 className="wikipedia-bio__title">Biography</h3>
            <div className="wikipedia-bio__columns">
              {trimmedString}... <a href={wikiURI} target="_blank">Read More</a>
            </div>
          </div>
        </div>
        <h3 className="details-section-title">Statistics</h3>
        <TabsContainer />
      </div>
    );
  }
});

module.exports = DetailsContainer;
