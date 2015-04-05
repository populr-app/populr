
// Controller for the people api route

var People = require('../database/people.js');
var Twitter = require('../database/twitter.js');
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
function add(req, res, next) {

  req.body.forEach(PeopleAdd);


  function PeopleAdd(obj){

    var query = {where: {fullName: obj.fullName}};
    People.findOne(query).then(function(foundPerson){

      if (!foundPerson){

        People.create(obj).then(function(newPerson){
          Ok('${a} created in People table', newPerson.get().id);
          var id = newPerson.get().id;
          if (obj.twitter) TwitterAdd(id, obj.twitter);
          if (obj.wiki) WikiAdd(id, obj.wiki);
        });

      } else {

        Ok('${a} found in People table', foundPerson.get().id);
        var id = foundPerson.get().id;
        if (obj.twitter) TwitterAdd(id, obj.twitter);
        if (obj.wiki) WikiAdd(id, obj.wiki);

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
        foundTwitter.update(obj).then(function(){
          Ok('${a} updated in Twitter table', foundTwitter.get().id);
        });

      }
    });
  }

  function WikiAdd(id, obj){
    Err('This funcionality hasnt been finished');
  }

}

// Dummy Test

// var request = {};
// request.body = [
//   {
//     fullName: 'Garrett Cox',
//     twitter: {
//       handle: 'garrettjoecox',
//       tcId: 1003,
//       followers: 120,
//       mentions: 50
//     }
//   }
// ];

// add(request);
