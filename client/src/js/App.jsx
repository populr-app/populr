var React = require('react');
window.React = React;
var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var NotFoundRoute = Router.NotFoundRoute;
var RouteHandler = Router.RouteHandler;

// Include view components
var ListView = require('./components/ListView/ListView.jsx');
var DetailsView = require('./components/DetailsView/DetailsView.jsx');
var AboutView = require('./components/AboutView/AboutView.jsx');
var DocsView = require('./components/DocsView/DocsView.jsx');

/* Main App */
var App = React.createClass({
  render: function(){
    return (
        <div className="app-inner">
          <RouteHandler />
        </div>
      );
  }
});

var routes = (
  <Route name="app" path="/" handler={App}>
    <DefaultRoute handler={ListView}/>
    <Route name="details" path="details/?:fullName?" handler={DetailsView}/>
    <Route name="about" handler={AboutView}/>
    <Route name="docs" handler={DocsView}/>
    <NotFoundRoute handler={ListView}/>
  </Route>
);

Router.run(routes, Router.HistoryLocation, function (Handler, state) {
  React.render(<Handler/>, document.getElementById('app'));
});

