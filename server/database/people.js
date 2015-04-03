
// Database model for everyone in our database

var uri = process.env.HEROKU_POSTGRESQL_OLIVE_URL || 'postgres://localhost:5432/yourname';
var Sequelize = require('sequelize');
var sql = new Sequelize(uri);

module.exports = sql.define('people', {
  id: { type: Sequelize.UUID, primaryKey: true, defaultValue: Sequelize.UUIDV1 allowNull: false },
  firstName: { type: Sequelize.STRING },
  lastName: { type: Sequelize.STRING },
  profession: { type: Sequelize.STRING },
  score: { type: Sequelize.INTEGER, default: 0},
  scoreChange: { type: Sequelize.INTEGER, default: 0},
  lastUpdate: {type: }
});

module.exports.sync();
