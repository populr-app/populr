
// Database model for the top 100 people

var uri = process.env.POSTGRESURI || 'postgres://localhost:5432/GarrettCox';
var Sequelize = require('sequelize');
var People = require('./people.js');
var sql = new Sequelize(uri);

module.exports = sql.define('top', {
  firstName: { type: Sequelize.STRING },
  lastName: { type: Sequelize.STRING },
  rank: { type: Sequelize.INTEGER}
});

module.exports.belongsTo(People);
module.exports.sync();
