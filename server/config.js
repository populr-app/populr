
/****************
  Server Config
****************/

/*
  Sets up the routing for the server, sending each
  API request to its associated controller
*/

/* * Imports * */

var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');

/* * Middleware * */

module.exports = app = express();
app.use(bodyParser.json());
app.use(express.static(__dirname + '/../client/dist/public'));

/* * API Routing * */

var topRouter = express.Router();
app.use('/api/top', topRouter);
require('./router.js').top(topRouter);

var peopleRouter = express.Router();
app.use('/api/people', peopleRouter);
require('./router.js').people(peopleRouter);

var twitterRouter = express.Router();
app.use('/api/twitter', twitterRouter);
require('./router.js').twitter(twitterRouter);

var contextRouter = express.Router();
app.use('/api/context', contextRouter);
require('./router.js').context(contextRouter);

var sitesRouter = express.Router();
app.use('/api/sites', sitesRouter);
require('./router.js').sites(sitesRouter);

var facebookRouter = express.Router();
app.use('/api/facebook', facebookRouter);
require('./router.js').facebook(facebookRouter);

/*
  Serves index on default
  TODO: Fix this
*/
app.use(function(req, res) {
  res.redirect('/');
});
