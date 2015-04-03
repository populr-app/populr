
// Database model for the top 100 people

var Sequelize = require('sequelize');
var People = require('./people.js');
var sql = require('./connection.js');

module.exports = sql.define('top', {
  firstName: { type: Sequelize.STRING },
  lastName: { type: Sequelize.STRING },
  rank: { type: Sequelize.INTEGER}
});

module.exports.belongsTo(People);
module.exports.sync();
