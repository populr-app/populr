
// Database model for peoples twitter data

var uri = process.env.POSTGRES_URI || 'postgres://localhost:5432/yourname';
var Sequelize = require('sequelize');
var People = require('./people.js');
var sql = new Sequelize(uri);

module.exports = sql.define('twitter', {
  handle: { type: Sequelize.STRING },
  followers: { type: Sequelize.INTEGER },
  followersChange: { type: Sequelize.INTEGER },
  mentions: { type: Sequelize.INTEGER },
  mentionsChange: { type: Sequelize.INTEGER }
});

module.exports.belongsTo(People);
module.exports.sync();
