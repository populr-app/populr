/*  Imports  */
var express = require('express');

/*  Declarations  */
module.exports = app = express();

// Serves up the client folder
app.use(express.static(__dirname + '/../client'));