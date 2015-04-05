
// Database model for peoples wikipedia data

var Sequelize = require('sequelize');
var sql = require('./connection.js');

module.exports = sql.define('wikipedia', {
  id: { type: Sequelize.UUID, primaryKey: true, allowNull: false },
  extract: { type: Sequelize.TEXT }
});

module.exports.sync();
