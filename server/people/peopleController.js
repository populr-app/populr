
// Controller for the people api route

var People = require('../database/people.js');
var Twitter = require('../database/twitter.js');
var Wikipedia = require('../database/wikipedia.js');
var Ok = require('../helpers/logger').Ok;
var Err = require('../helpers/logger').Err;

module.exports = {
  query: query,
  add: add
};

// query will send back the requested person's dataset
function query(req, res, next) {
  next();
}

// Adds a person to the database with the given social data
// Can take arrays of people, or just a single person object
function add(req, res, next) {
  if (req.body.people){
    req.body.people.forEach(PeopleAdd);
  } else {
    res.send('no');
  }
}

function PeopleAdd(obj){
  var query = {where: {fullName: obj.fullName}};
  People.findOne(query).then(function(foundPerson){

    if (!foundPerson){

      People.create(obj).then(function(newPerson){
        Ok('${a} created in People table', newPerson.get().id);
        var id = newPerson.get().id;
        if (obj.twitter) TwitterAdd(id, obj.twitter);
        if (obj.wikipedia) WikipediaAdd(id, obj.wikipedia);
      });

    } else {

      Ok('${a} found in People table', foundPerson.get().id);
      var id = foundPerson.get().id;
      if (obj.twitter) TwitterAdd(id, obj.twitter);
      if (obj.wikipedia) WikipediaAdd(id, obj.wikipedia);

    }
  });
}

function TwitterAdd(id, obj){
  var query = {where: {id: id}};
  Twitter.findOne(query).then(function(foundTwitter){

    if (!foundTwitter){

      obj.id = id;
      Twitter.create(obj).then(function(newTwitter){
        Ok('${a} created in Twitter table', newTwitter.get().id);
      });

    } else {

      obj.followersChange = obj.followers - foundTwitter.get().followers;
      if (isNaN(obj.followersChange)) obj.followersChange = 0;
      foundTwitter.update(obj).then(function(){
        Ok('${a} updated in Twitter table', foundTwitter.get().id);
      });

    }
  });
}

function WikipediaAdd(id, obj){
  var query = {where: {id: id}};
  Wikipedia.findOne(query).then(function(foundWikipedia){

    if (!foundWikipedia){

      obj.id = id;
      Wikipedia.create(obj).then(function(newWikipedia){
        Ok('${a} created in Wikipedia table', newWikipedia.get().id);
      });

    } else {

      foundWikipedia.update(obj).then(function(){
        Ok('${a} updated in Wikipedia table', foundWikipedia.get().id);
      });

    }
  });
}

// Uncomment to test with smalldata

// var fs = require('fs-utils');

// fs.readFile('smalldata.json', function(err, data) {
//   if (!err) {
//     var req = { body: JSON.parse(data) };
//     add(req);
//   } else {
//     Err(err);
//   }
// });
