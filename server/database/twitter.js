
// Database model for peoples twitter data

var Sequelize = require('sequelize');
var People = require('./people.js');
var sql = require('./connection.js');

module.exports = sql.define('twitter', {
  id: { type: Sequelize.UUID, primaryKey: true, allowNull: false },
  handle: { type: Sequelize.STRING },
  tcId: {type: Sequelize.STRING },
  followers: { type: Sequelize.INTEGER, defaultValue: 0 },
  followersChange: { type: Sequelize.INTEGER, defaultValue: 0 },
  mentions: { type: Sequelize.INTEGER, defaultValue: 0 },
  mentionsChange: { type: Sequelize.INTEGER, defaultValue: 0 }
});

module.exports.sync();
