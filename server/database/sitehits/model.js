
var Sequelize = require('sequelize');
var sql = require('../connection.js');

module.exports = sql.define('sitehits', {
  id: { type: Sequelize.UUID, primaryKey: true, allowNull: false },
  count: { type: Sequelize.STRING },
  lastCount: { type: Sequelize.STRING }
});

module.exports.sync();
