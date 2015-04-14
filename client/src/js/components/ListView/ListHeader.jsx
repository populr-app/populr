var ListHeader = React.createClass({
  render: function(){
    return (
        <div className="list-header">
        	<div className="container">
        		<div className="row">
	        		<h1 className="list-header__title col-md-12 col-sm-12">Intelligent Social Metrics</h1>
	        		<p className="list-header__about col-sm-12">
	        			Populr.io takes data from top social networks & news sites to rank the movers and shakers of the internet.
                Updated every 15 minutes, Populr.io provides the latest on your favorite Celebrities, Altheletes, and Public Figures.
	        		</p>
	        	</div>
        	</div>
        </div>
      );
  }
});

module.exports = ListHeader;
