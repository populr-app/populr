
var Sequelize = require('sequelize');
var sql = require('../connection.js');

module.exports = sql.define('people', {
  id: { type: Sequelize.UUID, primaryKey: true, defaultValue: Sequelize.UUIDV1, allowNull: false },
  fullName: { type: Sequelize.STRING, allowNull: false },
  score: { type: Sequelize.FLOAT, defaultValue: 0},
  scorechange: { type: Sequelize.FLOAT, defaultValue: 0}
});

module.exports.sync();
