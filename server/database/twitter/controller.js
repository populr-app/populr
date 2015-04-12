
/*********************
  Twitter Controller
*********************/

/* * Imports * */

var Twitter = require('./model');
var log = require('../../helpers/logger').log;

/* * API Methods * */

/*
  @middleware attachParam()

  Attaches the param on the api call (api/twitter/:param)
  to the request body as 'fullName'.
*/
module.exports.attachParam = function(req, res, next, param) {
  req.body = {fullName: param};
  next();
};

/*
  @routeHandler get()

  Uses the query method passing in the attached fullName on the request
  body and sends back the data if any.
*/
module.exports.get = function(req, res, next) {
  var person = req.body;
  module.exports.query(person.fullName)
    .then(function(data) {
      if (!data) {
        log('Invalid GET');
        res.send(person.fullName + ' Not found');
      } else {
        log('${a}: Sending data to client', data.fullName);
        res.send(data);
      }
    });
};

/* * Controller Methods * */

/*
  @function query()
  --in-> String | 'Garrett Cox'
  <-out- Object | {fullName: 'GarrettCox', score:90, scorechange: 10}

  Takes a full name and returns the associated data in the twitter
  table if any.
*/
module.exports.query = function(fullName) {
  if (!fullName) {
    return null;
  } else {
    var query = { where: { fullName: fullName } };
    log('${a}: Checking twitter table', fullName);
    return Twitter.findOne(fullName).then(function(foundTwitter) {
      if (!foundTwitter) {
        log('${a}: Not found in twitter table', fullName);
        return null;
      } else {
        log('${a}: Found in twitter table', fullName);
        return foundTwitter.get();
      }
    });
  }
};

/*
  @function attachData()
  --in-> Object | {fullname:'Garrett Cox'}
  <-out- Object | {fullname:'Garrett Cox', twitter:{score:90, scorechange: 10}}

  Takes an object with a fullName property and attaches the associated
  data in the twitter table on the twitter property of the object.
*/
module.exports.attachData = function(personObj) {
  if (!personObj) {
    return null;
  } else {
    return module.exports.query(personObj.fullName).then(function(foundTwitter) {
      if (!foundTwitter) {
        return personObj;
      } else {
        log('${a}: Attaching twitter data', personObj.fullName);
        personObj.twitter = foundTwitter;
        return personObj;
      }
    });
  }
};

/*
  @function add()
  --in-> Object | {fullname:'Garrett Cox', twitter:{score:90, scorechange: 10}}
  <-out- Object | Returns what was passed in

  Takes an object with a fullName & a twitter property and either creates
  or updates the corrosponding entry in the twitter table.
*/
module.exports.add = function(personObj) {
  if (!personObj.twitter) {
    return personObj;
  } else {
    var query = { where: { fullName: personObj.fullName } };
    log('${a}: Checking twitter table', personObj.fullName);
    return Twitter.findOne(query).then(function(foundTwitter) {
      if (foundTwitter) {
        log('${a}: Found in twitter table', personObj.fullName);
        log('${a}: Updating twitter data', personObj.fullName);
        foundTwitter.update(personObj.twitter);
        return personObj;
      } else {
        log('${a}: Not found in twitter table', personObj.fullName);
        log('${a}: Creating entry in twitter table', personObj.fullName);
        personObj.twitter.fullName = personObj.fullName;
        return Twitter.create(personObj.twitter).then(function(newTwitter) {
          return personObj;
        });
      }
    });
  }
};
