
/************
  Top Model
************/

/* * Imports * */

var Sequelize = require('sequelize');
var sql = require('../connection.js');

/* * Schema * */

module.exports = sql.define('top', {
  fullName: { type: Sequelize.STRING, allowNull: false, primaryKey: true },
  occupation: { type: Sequelize.STRING, defaultValue: '' },
  dob: {type: Sequelize.STRING, defaultValue: '' },
  sitecount: { type: Sequelize.INTEGER, defaultValue: 0 },
  rank: { type: Sequelize.INTEGER, defaultValue: 201 },
  lastrank: { type: Sequelize.INTEGER, defaultValue: 0 },
  profilePic: {type: Sequelize.STRING, defaultValue: '' },
  score: { type: Sequelize.INTEGER, defaultValue: 0 },
  scorechange: { type: Sequelize.INTEGER, defaultValue: 0 },
  scoreminute: { type: Sequelize.ARRAY(Sequelize.INTEGER), defaultValue: [] },
  scorehour: { type: Sequelize.ARRAY(Sequelize.INTEGER), defaultValue: [] },
  scoreday: { type: Sequelize.ARRAY(Sequelize.INTEGER), defaultValue: [] },
  scoreweek: { type: Sequelize.ARRAY(Sequelize.INTEGER), defaultValue: [] },
  scoremonth: { type: Sequelize.ARRAY(Sequelize.INTEGER), defaultValue: [] }
});

module.exports.sync();
