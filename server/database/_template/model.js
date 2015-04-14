
/*****************
  Template Model
*****************/

/* * Imports * */

var Sequelize = require('sequelize');
var sql = require('../connection.js');

/* * Schema * */

module.exports = sql.define('template', {
  fullName: { type: Sequelize.STRING, allowNull: false, primaryKey: true },
  score: { type: Sequelize.INTEGER, defaultValue: 0 },
  scorechange: { type: Sequelize.INTEGER, defaultValue: 0 },
  scoreperiodic: { type: Sequelize.ARRAY(Sequelize.INTEGER), defaultValue: [] }
});

module.exports.sync();
