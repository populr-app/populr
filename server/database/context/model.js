
/****************
  Context Model
****************/

/* * Imports * */

var Sequelize = require('sequelize');
var sql = require('../connection.js');

/* * Schema * */

module.exports = sql.define('context', {
  fullName: { type: Sequelize.STRING, allowNull: false, primaryKey: true },
  occupation: { type: Sequelize.STRING, defaultValue: '' },
  dob: { type: Sequelize.STRING, defaultValue: '' },
  description: { type: Sequelize.TEXT, defaultValue: '' }
});

module.exports.sync();
