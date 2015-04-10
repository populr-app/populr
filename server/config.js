/*  Imports  */
var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');

/*  Declarations  */
module.exports = app = express();
var topRouter = express.Router();
var peopleRouter = express.Router();
var twitterRouter = express.Router();
var contextRouter = express.Router();
var sitesRouter = express.Router();

/*  Configuration  */
app.use(bodyParser.json());
// app.use(morgan('dev'));
app.use(express.static(__dirname + '/../client/dist/public'));

app.use('/api/top', topRouter);
require('./router.js').top(topRouter);

app.use('/api/people', peopleRouter);
require('./router.js').people(peopleRouter);

app.use('/api/twitter', twitterRouter);
require('./router.js').twitter(twitterRouter);

app.use('/api/context', contextRouter);
require('./router.js').context(contextRouter);

app.use('/api/sites', sitesRouter);
require('./router.js').context(sitesRouter);

/*  serves index on default  */
app.use(function(req, res) {
  res.redirect('/');
});
