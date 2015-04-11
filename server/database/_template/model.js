
var Sequelize = require('sequelize');
var sql = require('../connection.js');

module.exports = sql.define('template', {
  fullName: { type: Sequelize.STRING, allowNull: false, primaryKey: true },
  score: { type: Sequelize.FLOAT, defaultValue: 0},
  scorechange: { type: Sequelize.FLOAT, defaultValue: 0},
  templateValue: { type: Sequelize.STRING }
});

module.exports.sync();
