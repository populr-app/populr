
var Sequelize = require('sequelize');
var sql = require('../connection.js');

module.exports = sql.define('top', {
  id: { type: Sequelize.UUID, primaryKey: true, allowNull: false },
  fullName: { type: Sequelize.STRING },
  rank: { type: Sequelize.INTEGER},
  score: { type: Sequelize.INTEGER, defaultValue: 0},
  lastScore: { type: Sequelize.INTEGER, defaultValue: 0},
  wiki: { type: Sequelize.TEXT }
});

module.exports.sync();
