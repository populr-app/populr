
var Sequelize = require('sequelize');
var sql = require('../connection.js');

module.exports = sql.define('top', {
  id: { type: Sequelize.UUID, primaryKey: true, allowNull: false },
  fullName: { type: Sequelize.STRING },
  rank: { type: Sequelize.INTEGER},
  lastRank: { type: Sequelize.INTEGER},
  score: { type: Sequelize.INTEGER, defaultValue: 0},
  scoreChange: { type: Sequelize.INTEGER, defaultValue: 0},
  wikipedia: { type: Sequelize.TEXT }
});

module.exports.sync();
