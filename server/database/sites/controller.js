
/*******************
  Sites Controller
*******************/

/* * Imports * */

var Sites = require('./model');
var log = require('../../helpers/logger').log;

/* * API Methods * */

/*
  @middleware attachParam()

  Attaches the param on the api call (api/sites/:param)
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

  Takes a full name and returns the associated data in the sites
  table if any.
*/
module.exports.query = function(fullName) {
  if (!fullName) {
    return null;
  } else {
    var query = { where: { fullName: fullName } };
    log('${a}: Checking sites table', fullName);
    return Sites.findOne(fullName).then(function(foundSites) {
      if (!foundSites) {
        log('${a}: Not found in sites table', fullName);
        return null;
      } else {
        log('${a}: Found in sites table', fullName);
        return foundSites.get();
      }
    });
  }
};

/*
  @function attachData()
  --in-> Object | {fullname:'Garrett Cox'}
  <-out- Object | {fullname:'Garrett Cox', sites:{score:90, scorechange: 10}}

  Takes an object with a fullName property and attaches the associated
  data in the sites table on the sites property of the object.
*/
module.exports.attachData = function(personObj) {
  if (!personObj) {
    return null;
  } else {
    return module.exports.query(personObj.fullName).then(function(foundSites) {
      if (!foundSites) {
        return personObj;
      } else {
        log('${a}: Attaching sites data', personObj.fullName);
        personObj.sites = foundSites;
        return personObj;
      }
    });
  }
};

/*
  @function add()
  --in-> Object | {fullname:'Garrett Cox', sites:{score:90, scorechange: 10}}
  <-out- Object | Returns what was passed in

  Takes an object with a fullName & a sites property and either creates
  or updates the corrosponding entry in the sites table.
*/
module.exports.add = function(personObj) {
  if (!personObj.sites) {
    return personObj;
  } else {
    var query = { where: { fullName: personObj.fullName } };
    log('${a}: Checking sites table', personObj.fullName);
    return Sites.findOne(query).then(function(foundSites) {
      if (foundSites) {
        log('${a}: Found in sites table', personObj.fullName);
        log('${a}: Updating sites data', personObj.fullName);
        foundSites.update(personObj.sites);
        return personObj;
      } else {
        log('${a}: Not found in sites table', personObj.fullName);
        log('${a}: Creating entry in sites table', personObj.fullName);
        personObj.sites.fullName = personObj.fullName;
        return Sites.create(personObj.sites).then(function(newSites) {
          return personObj;
        });
      }
    });
  }
};
