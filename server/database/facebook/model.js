
/*****************
  Facebook Model
*****************/

/* * Imports * */

var Sequelize = require('sequelize');
var sql = require('../connection.js');

/* * Schema * */

module.exports = sql.define('facebook', {
  fullName: { type: Sequelize.STRING, allowNull: false, primaryKey: true },
  pages: { type: Sequelize.ARRAY(Sequelize.STRING) },
  score: { type: Sequelize.INTEGER, defaultValue: 0 },
  scorechange: { type: Sequelize.INTEGER, defaultValue: 0 },
  scorehour: { type: Sequelize.ARRAY(Sequelize.INTEGER), defaultValue: [] },
  scoreday: { type: Sequelize.ARRAY(Sequelize.INTEGER), defaultValue: [] },
  scoreweek: { type: Sequelize.ARRAY(Sequelize.INTEGER), defaultValue: [] },
  scoremonth: { type: Sequelize.ARRAY(Sequelize.INTEGER), defaultValue: [] }
});

module.exports.sync();
