
/**********************
  Facebook Controller
**********************/

/* * Imports * */

var Facebook = require('./model');
var log = require('../../helpers/logger').log;

/* * API Methods * */

/*
  @middleware attachParam()

  Attaches the param on the api call (api/facebook/:param)
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

  Takes a full name and returns the associated data in the facebook
  table if any.
*/
module.exports.query = function(fullName) {
  if (!fullName) {
    return null;
  } else {
    var query = { where: { fullName: fullName } };
    log('${a}: Checking facebook table', fullName);
    return Facebook.findOne(fullName).then(function(foundFacebook) {
      if (!foundFacebook) {
        log('${a}: Not found in facebook table', fullName);
        return null;
      } else {
        log('${a}: Found in facebook table', fullName);
        return foundFacebook.get();
      }
    });
  }
};

/*
  @function attachData()
  --in-> Object | {fullname:'Garrett Cox'}
  <-out- Object | {fullname:'Garrett Cox', facebook:{score:90, scorechange: 10}}

  Takes an object with a fullName property and attaches the associated
  data in the facebook table on the facebook property of the object.
*/
module.exports.attachData = function(personObj) {
  if (!personObj) {
    return null;
  } else {
    return module.exports.query(personObj.fullName).then(function(foundFacebook) {
      if (!foundFacebook) {
        return personObj;
      } else {
        log('${a}: Attaching facebook data', personObj.fullName);
        personObj.facebook = foundFacebook;
        return personObj;
      }
    });
  }
};

/*
  @function add()
  --in-> Object | {fullname:'Garrett Cox', facebook:{score:90, scorechange: 10}}
  <-out- Object | Returns what was passed in

  Takes an object with a fullName & a facebook property and either creates
  or updates the corrosponding entry in the facebook table.
*/
module.exports.add = function(personObj) {
  if (!personObj.facebook) {
    return personObj;
  } else {
    var query = { where: { fullName: personObj.fullName } };
    log('${a}: Checking facebook table', personObj.fullName);
    return Facebook.findOne(query).then(function(foundFacebook) {
      if (foundFacebook) {
        log('${a}: Found in facebook table', personObj.fullName);
        log('${a}: Updating facebook data', personObj.fullName);
        foundFacebook.update(personObj.facebook);
        return personObj;
      } else {
        log('${a}: Not found in facebook table', personObj.fullName);
        log('${a}: Creating entry in facebook table', personObj.fullName);
        personObj.facebook.fullName = personObj.fullName;
        return Facebook.create(personObj.facebook).then(function(newFacebook) {
          return personObj;
        });
      }
    });
  }
};
