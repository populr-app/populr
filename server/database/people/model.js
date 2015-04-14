
var Sequelize = require('sequelize');
var sql = require('../connection.js');

module.exports = sql.define('people', {
  id: { type: Sequelize.UUID, primaryKey: true, defaultValue: Sequelize.UUIDV1, allowNull: false },
  fullName: { type: Sequelize.STRING, allowNull: false },
  score: { type: Sequelize.INTEGER, defaultValue: 0 },
  scorechange: { type: Sequelize.INTEGER, defaultValue: 0 },
  scorehour: { type: Sequelize.ARRAY(Sequelize.INTEGER), defaultValue: [] },
  scoreday: { type: Sequelize.ARRAY(Sequelize.INTEGER), defaultValue: [] },
  scoreweek: { type: Sequelize.ARRAY(Sequelize.INTEGER), defaultValue: [] },
  scoremonth: { type: Sequelize.ARRAY(Sequelize.INTEGER), defaultValue: [] }
});

module.exports.sync();
