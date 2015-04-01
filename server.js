// Imports the server configuration
var app = require('./server/config');

// Sets port to deployed port or local 9000
var port = process.env.PORT || 9000;

// Starts server on provided port
app.listen(port, function() {
  console.log('listening on 9000');
});
