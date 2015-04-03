
// Database model for the top 100 people

var uri = process.env.HEROKU_POSTGRESQL_OLIVE_URL || 'postgres://localhost:5432/yourname';
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
