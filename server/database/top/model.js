
/************
  Top Model
************/

/* * Imports * */

var Sequelize = require('sequelize');
var sql = require('../connection.js');

/* * Schema * */

module.exports = sql.define('top', {
  fullName: { type: Sequelize.STRING, allowNull: false, primaryKey: true },
  score: { type: Sequelize.INTEGER, defaultValue: 0 },
  scorechange: { type: Sequelize.INTEGER, defaultValue: 0 },
  scoreperiodic: { type: Sequelize.ARRAY(Sequelize.INTEGER), defaultValue: [] },
  occupation: { type: Sequelize.STRING, defaultValue: '' },
  dob: {type: Sequelize.STRING, defaultValue: '' },
  rank: { type: Sequelize.INTEGER, defaultValue: 201 },
  lastrank: { type: Sequelize.INTEGER, defaultValue: 0 },
  profilePic: {type: Sequelize.STRING, defaultValue: '' }
});

module.exports.sync();
