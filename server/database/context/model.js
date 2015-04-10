
var Sequelize = require('sequelize');
var sql = require('../connection.js');

module.exports = sql.define('context', {
  fullName: { type: Sequelize.STRING, allowNull: false, primaryKey: true },
  occupation: { type: Sequelize.STRING },
  dob: { type: Sequelize.STRING },
  description: { type: Sequelize.TEXT }
});

module.exports.sync();
