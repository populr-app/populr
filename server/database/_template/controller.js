
/*
 * Template
 * template
 * Highlight the words above, hold cmd + shift + D
 * replace them with the name of your db
 * Make sure to capitalize the first letter while on the first change
 * and delete this block when done!
 */

/**********************
  Template Controller
**********************/

/* * Imports * */

var Template = require('./model');
var log = require('../../helpers/logger').log;

/* * API Methods * */

/*
  @middleware attachParam()

  Attaches the param on the api call (api/template/:param)
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

  Takes a full name and returns the associated data in the template
  table if any.
*/
module.exports.query = function(fullName) {
  if (!fullName) {
    return null;
  } else {
    var query = { where: { fullName: fullName } };
    log('${a}: Checking template table', fullName);
    return Template.findOne(fullName).then(function(foundTemplate) {
      if (!foundTemplate) {
        log('${a}: Not found in template table', fullName);
        return null;
      } else {
        log('${a}: Found in template table', fullName);
        return foundTemplate.get();
      }
    });
  }
};

/*
  @function attachData()
  --in-> Object | {fullname:'Garrett Cox'}
  <-out- Object | {fullname:'Garrett Cox', template:{score:90, scorechange: 10}}

  Takes an object with a fullName property and attaches the associated
  data in the template table on the template property of the object.
*/
module.exports.attachData = function(personObj) {
  if (!personObj) {
    return null;
  } else {
    return module.exports.query(personObj.fullName).then(function(foundTemplate) {
      if (!foundTemplate) {
        return personObj;
      } else {
        log('${a}: Attaching template data', personObj.fullName);
        personObj.template = foundTemplate;
        return personObj;
      }
    });
  }
};

/*
  @function add()
  --in-> Object | {fullname:'Garrett Cox', template:{score:90, scorechange: 10}}
  <-out- Object | Returns what was passed in

  Takes an object with a fullName & a template property and either creates
  or updates the corrosponding entry in the template table.
*/
module.exports.add = function(personObj) {
  if (!personObj.template) {
    return personObj;
  } else {
    var query = { where: { fullName: personObj.fullName } };
    log('${a}: Checking template table', personObj.fullName);
    return Template.findOne(query).then(function(foundTemplate) {
      if (foundTemplate) {
        log('${a}: Found in template table', personObj.fullName);
        log('${a}: Updating template data', personObj.fullName);
        foundTemplate.update(personObj.template);
        return personObj;
      } else {
        log('${a}: Not found in template table', personObj.fullName);
        log('${a}: Creating entry in template table', personObj.fullName);
        personObj.template.fullName = personObj.fullName;
        return Template.create(personObj.template).then(function(newTemplate) {
          return personObj;
        });
      }
    });
  }
};
