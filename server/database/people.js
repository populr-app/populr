
// Database model for everyone in our database
var Sequelize = require('sequelize');

var sql = require('./connection.js');
module.exports = sql.define('people', {
  id: { type: Sequelize.UUID, primaryKey: true, defaultValue: Sequelize.UUIDV1, allowNull: false },
  firstName: { type: Sequelize.STRING },
  lastName: { type: Sequelize.STRING },
  profession: { type: Sequelize.STRING },
  score: { type: Sequelize.INTEGER, default: 0},
  scoreChange: { type: Sequelize.INTEGER, default: 0},
  lastUpdate: {type: Sequelize.DATE}
});

module.exports.sync();
