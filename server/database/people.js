
// Database model for everyone in our database

var uri = process.env.POSTGRESURI || 'postgres://localhost:5432/GarrettCox';
var Sequelize = require('sequelize');
var sql = new Sequelize(uri);

module.exports = sql.define('people', {
  identifier: { type: Sequelize.STRING, primaryKey: true },
  firstName: { type: Sequelize.STRING },
  lastName: { type: Sequelize.STRING },
  profession: { type: Sequelize.STRING },
  score: { type: Sequelize.INTEGER, default: 0},
  scoreChange: { type: Sequelize.INTEGER, default: 0},
});

module.exports.sync();
