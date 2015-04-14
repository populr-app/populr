
/*****************
  Facebook Model
*****************/

/* * Imports * */

var Sequelize = require('sequelize');
var sql = require('../connection.js');

/* * Schema * */

module.exports = sql.define('facebook', {
  fullName: { type: Sequelize.STRING, allowNull: false, primaryKey: true },
  score: { type: Sequelize.INTEGER, defaultValue: 0 },
  scorechange: { type: Sequelize.INTEGER, defaultValue: 0 },
  scoreperiodic: { type: Sequelize.ARRAY(Sequelize.INTEGER), defaultValue: [] },
  pages: { type: Sequelize.ARRAY(Sequelize.STRING) }
});

module.exports.sync();
