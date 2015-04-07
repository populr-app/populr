
var Twitter = require('./model');

module.exports.get = function() {
  console.log('get');
};

module.exports.post = function() {
  console.log('post');
};

module.exports.query = function(query) {
  if (!query) return null;
  return Twitter.findOne(query).then(function(foundTwitter) {
    if (!foundTwitter) {
      return null;
    } else {
      return foundTwitter.get();
    }
  });
};

module.exports.attachData = function(personObj) {
  if (!personObj) return null;
  var query = { where: { id: personObj.id } };
  return module.exports.query(query).then(function(foundTwitter) {
    if (!foundTwitter) return personObj;
    else {
      personObj.twitter = foundTwitter;
      return personObj;
    }
  });
};

module.exports.add = function(personObj) {
  if (!personObj.twitter) return personObj;
  var query = { where: { id: personObj.id } };
  return module.exports.query(query).then(function(foundTwitter) {
    if (!foundTwitter) {
      personObj.twitter.id = personObj.id;
      return Twitter.create(personObj.twitter).then(function(newTwitter) {
        return personObj;
      });
    } else {
      return personObj;
    }
  });
};
