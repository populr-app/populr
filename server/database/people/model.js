
var Sequelize = require('sequelize');
var sql = require('../connection.js');

module.exports = sql.define('people', {
  id: { type: Sequelize.UUID, primaryKey: true, defaultValue: Sequelize.UUIDV1, allowNull: false },
  fullName: { type: Sequelize.STRING },
  score: { type: Sequelize.INTEGER, defaultValue: 0},
  scoreChange: { type: Sequelize.INTEGER, defaultValue: 0}
});

module.exports.sync();
