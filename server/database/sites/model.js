
/**************
  Sites Model
**************/

/* * Imports * */

var Sequelize = require('sequelize');
var sql = require('../connection.js');

/* * Schema * */

module.exports = sql.define('sites', {
  fullName: { type: Sequelize.STRING, allowNull: false, primaryKey: true },
  score: { type: Sequelize.INTEGER, defaultValue: 0 },
  scorechange: { type: Sequelize.INTEGER, defaultValue: 0 },
  scoreperiodic: { type: Sequelize.ARRAY(Sequelize.INTEGER), defaultValue: [] },
  count: { type: Sequelize.INTEGER, defaultValue: 0 },
  countchange: { type: Sequelize.INTEGER, defaultValue: 0 },
  countperiodic: { type: Sequelize.ARRAY(Sequelize.INTEGER), defaultValue: [] }
});

module.exports.sync();
