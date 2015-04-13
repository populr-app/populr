
/************
  Top Model
************/

/* * Imports * */

var Sequelize = require('sequelize');
var sql = require('../connection.js');

/* * Schema * */

module.exports = sql.define('top', {
  fullName: { type: Sequelize.STRING, allowNull: false, primaryKey: true },
  score: { type: Sequelize.FLOAT, defaultValue: 0},
  scorechange: { type: Sequelize.FLOAT, defaultValue: 0},
  occupation: { type: Sequelize.STRING, defaultValue: '' },
  dob: {type: Sequelize.STRING, defaultValue: '' },
  rank: { type: Sequelize.INTEGER, defaultValue: 201 },
  lastrank: { type: Sequelize.INTEGER, defaultValue: 0 }
});

module.exports.sync();
