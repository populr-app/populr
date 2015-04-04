
// Database model for peoples twitter data

var Sequelize = require('sequelize');
var People = require('./people.js');
var sql = require('./connection.js');

module.exports = sql.define('twitter', {
  id: { type: Sequelize.UUID, primaryKey: true, allowNull: false },
  handle: { type: Sequelize.STRING },
  tcId: {type: Sequelize.STRING },
  followers: { type: Sequelize.INTEGER },
  followersChange: { type: Sequelize.INTEGER },
  mentions: { type: Sequelize.INTEGER },
  mentionsChange: { type: Sequelize.INTEGER }
});

// module.exports.sync();
