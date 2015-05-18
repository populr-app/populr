var AboutContainer = React.createClass({
	render: function() {
    var cardBackgrounds = {
      danny: {
        backgroundImage: 'url("http://i.imgur.com/syudJMa.png")'
      },
      garrett: {
        backgroundImage: 'url("http://i.imgur.com/hH0upNX.jpg")',
      },
      mark: {
        backgroundImage: 'url("http://i.imgur.com/IuijDCu.png")'
      },
      will: {
        backgroundImage: 'url("http://i.imgur.com/jGIGWOA.jpg")'
      }
    }
		return (
			<div className="about-container">
        <div className="about-project-container">
  				<div className="container">
  					<h3 className="about-section__title">About</h3>
            <p className="about-section__biography">

              The internet is one big popularity contest, and it’s rarely clear who’s winning. Across the board, many celebrity news sites seem to employ ambiguous criteria for determining who’s on top.

              In contrast, Populr harnesses the power of ‘Big Data’ to mathematically rank the top influencers of the internet. We’ve engineered our algorithms to combine social API metrics, online news media presence, and informative data visualizations to rank celebrities while delivering a clean and enjoyable user experience.

              With a collective interest in data science and the technical challenges that go with it, the Populr team set out to build a product that delivers value regardless of the size of its user base. 

            </p>
  				</div>
        </div>
        <div className="about-team-container">
          <div className="container">
            <h3 className="about-section__title">The Team</h3>
            <div className="row">
              <div className="col-md-3">
                 <div className="about-card">
                   <div className="about-card__header" style={cardBackgrounds.danny}>
                     <div className="about-card__profile-pic">
                       <img src="http://i.imgur.com/Dna3Zrt.jpg" />
                     </div>
                   </div>
                   <div className="about-card__bio">
                     <span className="about-card__name">Danny Delott</span>
                     <span className="about-card__role">
                        Back-End and Data Engineer
                     </span>
                     <ul className="about-card__links">
                       <li><a href="https://github.com/dannydelott" target="_blank"><i className="fa fa-github"/></a></li>
                       <li><a href="https://www.linkedin.com/in/dannydelott" target="_blank"><i className="fa fa-linkedin"/></a></li>
                       <li><a href="https://angel.co/danny-delott" target="_blank"><i className="fa fa-angellist"/></a></li>
                     </ul>
                   </div>
                 </div>
              </div>
              <div className="col-md-3">
                <div className="about-card">
                  <div className="about-card__header" style={cardBackgrounds.garrett}>
                    <div className="about-card__profile-pic">
                      <img src="http://i.imgur.com/fdmLqaF.jpg" />
                    </div>
                  </div>
                  <div className="about-card__bio">
                    <span className="about-card__name">Garrett Cox</span>
                    <span className="about-card__role">
                      Lead Back-End Engineer
                    </span>
                    <ul className="about-card__links">
                      <li><a href="https://github.com/garrettjoecox" target="_blank"><i className="fa fa-github"/></a></li>
                      <li><a href="https://www.linkedin.com/in/garrettjoecox" target="_blank"><i className="fa fa-linkedin"/></a></li>
                      <li><a href="https://angel.co/garrettjoecox" target="_blank"><i className="fa fa-angellist"/></a></li>
                    </ul>
                  </div>
                </div> 
              </div>
              <div className="col-md-3">
                <div className="about-card">
                  <div className="about-card__header" style={cardBackgrounds.mark}>
                    <div className="about-card__profile-pic">
                      <img src="http://i.imgur.com/L2P3Mtf.jpg" />
                    </div>
                  </div>
                  <div className="about-card__bio">
                    <span className="about-card__name">Mark Marcantano</span>
                    <span className="about-card__role">
                      Front-End Dev. and Architect
                    </span>
                    <ul className="about-card__links">
                      <li><a href="https://github.com/mmarcant" target="_blank"><i className="fa fa-github"/></a></li>
                      <li><a href="https://www.linkedin.com/in/markthomasm" target="_blank"><i className="fa fa-linkedin"/></a></li>
                      <li><a href="https://angel.co/mark-thomas-marcantano" target="_blank"><i className="fa fa-angellist"/></a></li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="about-card">
                  <div className="about-card__header" style={cardBackgrounds.will}>
                    <div className="about-card__profile-pic">
                      <img src="http://i.imgur.com/1AhgPvU.jpg" />
                    </div>
                  </div>
                  <div className="about-card__bio">
                    <span className="about-card__name">William Wung</span>
                    <span className="about-card__role">
                      Front-End Dev. and Designer
                    </span>
                    <ul className="about-card__links">
                      <li><a href="https://github.com/wcwung"><i className="fa fa-github" target="_blank"/></a></li>
                      <li><a href="https://www.linkedin.com/in/williamwung" target="_blank"><i className="fa fa-linkedin"/></a></li>
                      <li><a href="https://angel.co/williamcwung" target="_blank"><i className="fa fa-angellist"/></a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
			</div>
		);
	}
});

module.exports = AboutContainer;
