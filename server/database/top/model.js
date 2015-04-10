
var Sequelize = require('sequelize');
var sql = require('../connection.js');

module.exports = sql.define('top', {
  fullName: { type: Sequelize.STRING, allowNull: false, primaryKey: true },
  score: { type: Sequelize.FLOAT, defaultValue: 0},
  scoreChange: { type: Sequelize.FLOAT, defaultValue: 0},
  occupation: { type: Sequelize.STRING },
  dob: {type: Sequelize.STRING },
  rank: { type: Sequelize.INTEGER},
  lastRank: { type: Sequelize.INTEGER}
});

module.exports.sync();
