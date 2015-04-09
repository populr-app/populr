/**
 * Template model
 * @module template/model
 * @see module:template/controller
 */
var Sequelize = require('sequelize');
var sql = require('../connection.js');

module.exports = sql.define('template', {
  id: { type: Sequelize.UUID, primaryKey: true, allowNull: false },
  templateValue: { type: Sequelize.STRING }
});

module.exports.sync();
