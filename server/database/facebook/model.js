
var Sequelize = require('sequelize');
var sql = require('../connection.js');

module.exports = sql.define('facebook', {
  fullName: { type: Sequelize.STRING, allowNull: false, primaryKey: true },
  score: { type: Sequelize.FLOAT, defaultValue: 0},
  scorechange: { type: Sequelize.FLOAT, defaultValue: 0},
  pages: { type: Sequelize.ARRAY(Sequelize.STRING) }
});

module.exports.sync();
