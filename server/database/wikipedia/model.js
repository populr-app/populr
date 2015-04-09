
var Sequelize = require('sequelize');
var sql = require('../connection.js');

module.exports = sql.define('wikipedia', {
  id: { type: Sequelize.UUID, primaryKey: true, allowNull: false },
  fullName: { type: Sequelize.STRING },
  occupation:{ type: Sequelize.STRING },
  extract: { type: Sequelize.TEXT },
  url: { type: Sequelize.STRING }
});

module.exports.sync();
