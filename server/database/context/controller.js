
/*********************
  Context Controller
*********************/

/* * Imports * */

var Context = require('./model');
var log = require('../../helpers/logger').log;

/* * API Methods * */

/*
  @middleware attachParam()

  Attaches the param on the api call (api/context/:param)
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

  Takes a full name and returns the associated data in the context
  table if any.
*/
module.exports.query = function(fullName) {
  if (!fullName) {
    return null;
  } else {
    var query = { where: { fullName: fullName } };
    log('${a}: Checking context table', fullName);
    return Context.findOne(fullName).then(function(foundContext) {
      if (!foundContext) {
        log('${a}: Not found in context table', fullName);
        return null;
      } else {
        log('${a}: Found in context table', fullName);
        return foundContext.get();
      }
    });
  }
};

/*
  @function attachData()
  --in-> Object | {fullname:'Garrett Cox'}
  <-out- Object | {fullname:'Garrett Cox', context:{score:90, scorechange: 10}}

  Takes an object with a fullName property and attaches the associated
  data in the context table on the context property of the object.
*/
module.exports.attachData = function(personObj) {
  if (!personObj) {
    return null;
  } else {
    return module.exports.query(personObj.fullName).then(function(foundContext) {
      if (!foundContext) {
        return personObj;
      } else {
        log('${a}: Attaching context data', personObj.fullName);
        personObj.context = foundContext;
        return personObj;
      }
    });
  }
};

/*
  @function add()
  --in-> Object | {fullname:'Garrett Cox', context:{score:90, scorechange: 10}}
  <-out- Object | Returns what was passed in

  Takes an object with a fullName & a context property and either creates
  or updates the corrosponding entry in the context table.
*/
module.exports.add = function(personObj) {
  if (!personObj.context) {
    return personObj;
  } else {
    var query = { where: { fullName: personObj.fullName } };
    log('${a}: Checking context table', personObj.fullName);
    return Context.findOne(query).then(function(foundContext) {
      if (foundContext) {
        log('${a}: Found in context table', personObj.fullName);
        log('${a}: Updating context data', personObj.fullName);
        foundContext.update(personObj.context);
        return personObj;
      } else {
        log('${a}: Not found in context table', personObj.fullName);
        log('${a}: Creating entry in context table', personObj.fullName);
        personObj.context.fullName = personObj.fullName;
        return Context.create(personObj.context).then(function(newContext) {
          return personObj;
        });
      }
    });
  }
};
