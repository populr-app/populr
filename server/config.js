/*  Imports  */
var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');

/*  Declarations  */
module.exports = app = express();
var aListRouter = express.Router();
var peopleRouter = express.Router();

/*  Configuration  */
app.use(express.static(__dirname + '/../client/src'));
app.use(bodyParser.json());
app.use(morgan('dev'));

app.use('/api/alist', aListRouter);
require('/aList/aListRoutes.js')(aListRouter);

app.use('/api/people', peopleRouter);
require('/people/peopleRoutes.js')(peopleRouter);
