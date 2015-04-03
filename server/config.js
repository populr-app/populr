/*  Imports  */
var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');

/*  Declarations  */
module.exports = app = express();
var topRouter = express.Router();
var peopleRouter = express.Router();

/*  Configuration  */
app.use(express.static(__dirname + '/../client/dist/public'));
app.use(bodyParser.json());
app.use(morgan('dev'));

app.use('/api/top', topRouter);
require('./top/topRoutes.js')(topRouter);

app.use('/api/people', peopleRouter);
require('./people/peopleRoutes.js')(peopleRouter);
