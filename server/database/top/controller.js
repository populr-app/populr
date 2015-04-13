
/*****************
  Top Controller
*****************/

/* * Imports * */

var Top = require('./model');
var log = require('../../helpers/log');

/* * API Methods * */

/*
  @middleware attachParam()

  Attaches the param on the api call (api/top/:param)
  to the request body as 'listName'.
*/
module.exports.attachParam = function(req, res, next, param) {
  req.body.listName = param;
  next();
};

/*
  @routeHandler get()

  Uses the getList method passing in the attached listName on the request
  body if any and sends back the requested list.
*/
module.exports.get = function(req, res) {
  module.exports.getList(req.body.listName).then(function(data) {
    res.send(data);
  });
};

/* * Controller Methods * */

/*
  @function getList()
  --in-> String | 'a'
  <-out- Object | {a: [{}, {}, {}, etc]}

  Optionally takes a listName (a, b, c, d, all) and returns the
  associated list or all 4 lists
*/
module.exports.getList = function(listName) {
  return Top.findAll({order: 'rank ASC'}).then(function(data) {
    lists = {a: [], b: [], c: [], d: [], all: []};
    data.forEach(function(person, index) {
      person = person.get();
      lists.all.push(person);
      if (index <= 49) lists.a.push(person);
      else if (index <= 99) lists.b.push(person);
      else if (index <= 149) lists.c.push(person);
      else lists.d.push(person);
    });

    if (lists[listName]) return lists[listName];
    else {
      delete lists.all;
      return lists;
    }
  });
};

/*
  @function query()
  --in-> String | 'Garrett Cox'
  <-out- Object | {fullName: 'GarrettCox', score:90, scorechange: 10}

  Takes a full name and returns the associated data in the top
  table if any.
*/
module.exports.query = function(fullName) {
  if (!fullName) {
    return null;
  } else {
    var query = { where: { fullName: fullName } };
    return Top.findOne(fullName).then(function(foundTop) {
      if (!foundTop) {
        return null;
      } else {
        return foundTop.get();
      }
    });
  }
};

/*
  @function attachData()
  --in-> Object | {fullname:'Garrett Cox'}
  <-out- Object | {fullname:'Garrett Cox', top:{score:90, scorechange: 10}}

  Takes an object with a fullName property and attaches the associated
  data in the top table on the top property of the object.
*/
module.exports.attachData = function(personObj) {
  if (!personObj) {
    return null;
  } else {
    return module.exports.query(personObj.fullName).then(function(foundTop) {
      if (!foundTop) {
        return personObj;
      } else {
        personObj.top = foundTop;
        return personObj;
      }
    });
  }
};
