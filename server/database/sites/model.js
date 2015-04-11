
var Sequelize = require('sequelize');
var sql = require('../connection.js');

module.exports = sql.define('sites', {
  fullName: { type: Sequelize.STRING, allowNull: false, primaryKey: true },
  score: { type: Sequelize.FLOAT, defaultValue: 0},
  scorechange: { type: Sequelize.FLOAT, defaultValue: 0},
  count: { type: Sequelize.INTEGER, defaultValue: 0 },
  countchange: { type: Sequelize.INTEGER, defaultValue: 0 }
});

module.exports.sync();
