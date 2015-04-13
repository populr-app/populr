
/****************
  Server Engine
****************/

/*
  Runs the configuration and starts up the server
*/
var app = require('./server/config');
var port = process.env.PORT || 9000;

app.listen(port, function() {
  console.log('listening on', port);
});
