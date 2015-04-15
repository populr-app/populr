var graph = require('fbgraph');
var keys = require('../../keys.js').facebook;

var searchOptions = {
  q:'Katy Perry',
  type: 'page'
};

graph
  .setAccessToken(keys.accessToken)
  .setAppSecret(keys.appSecret)
   .get("1392443837682836", function(err, res) {
    console.log(res); // { id: '4', name: 'Mark Zuckerberg'... }
  });
  // .search(searchOptions, function(err, res) {
  //   console.log(graph.getAccessToken());
  //   console.log(res); // {data: [{id: xxx, from: ...}, {id: xxx, from: ...}]}
  // });
