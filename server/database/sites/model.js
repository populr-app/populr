
var Sequelize = require('sequelize');
var sql = require('../connection.js');

module.exports = sql.define('sites', {
  id: { type: Sequelize.UUID, primaryKey: true, allowNull: false },
  count: { type: Sequelize.STRING },
  countChange: { type: Sequelize.STRING }
});

module.exports.sync();
