
var Top = require('./model');
var log = require('../../helpers/logger').log;

/* Routes Handlers */

module.exports.attachParam = function(req, res, next, id) {
  req.body.list = id;
  next();
};

module.exports.get = function(req, res) {
  module.exports.getList(req.body.list).then(function(data) {
    res.send(data);
  });
};

/* Methods */

// Optionally takes a list name (a, b, c, d) and returns the
// requested list or all 4 lists (sorted)
module.exports.getList = function(which) {
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

    if (lists[which]) return lists[which];
    else {
      delete lists.all;
      return lists;
    }
  });
};

/**
 * Takes a fullName and returns the corresponding data on the Top table
 *
 * @param {String} fullName Full name of the data you desire
 *
 * @return {Object} {
 *   fullName: String,
 *   score: Number,
 *   scoreChange: Number
 * }
 */
module.exports.query = function(fullName) {
  if (!fullName) {
    return null;
  } else {
    var query = { where: { fullName: fullName } };
    log('${a}: Checking top table', fullName);
    return Top.findOne(fullName).then(function(foundTop) {
      if (!foundTop) {
        log('${a}: Not found in top table', fullName);
        return null;
      } else {
        log('${a}: Found in top table', fullName);
        return foundTop.get();
      }
    });
  }
};

/**
 * Takes an object with a UUID and attaches and returns the corresponding data on the Top table to the object
 *
 * @param {Object} personObj The personObj with a UUID on it that you want to attach the top data onto
 *
 * @return {personObj} personObj with attached top (personObj.top)
 */
module.exports.attachData = function(personObj) {
  if (!personObj) {
    return null;
  } else {
    return module.exports.query(personObj.fullName).then(function(foundTop) {
      if (!foundTop) {
        return personObj;
      } else {
        log('${a}: Attaching top data', personObj.fullName);
        personObj.top = foundTop;
        return personObj;
      }
    });
  }
};
