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
var MobileHeader = require('./components/partials/MobileHeader.jsx');

var PeopleStore = require('./stores/PeopleStore.jsx');
var PeopleActions = require('./actions/PeopleActions.jsx');

/* Main App */
var App = React.createClass({
  render: function(){
    return (
      <div>
        <MobileHeader />
        <div className="app-inner">
          <RouteHandler />
        </div>
      </div>
      );
  }
});

var routes = (
  <Route name="app" path="/" handler={App}>
    <DefaultRoute name="home" handler={ListView}/>
    <Route name="details" path="details/?:fullName?" handler={DetailsView}/>
    <Route name="about" handler={AboutView}/>
    <Route name="docs" handler={DocsView}/>
    <NotFoundRoute handler={ListView}/>
  </Route>
);

Router.run(routes, Router.HistoryLocation, function (Handler, state) {
  React.render(<Handler/>, document.getElementById('app'));
});

