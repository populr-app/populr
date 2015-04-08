
var Sequelize = require('sequelize');
var sql = require('../connection.js');

module.exports = sql.define('twitter', {
  id: { type: Sequelize.UUID, primaryKey: true, allowNull: false },
  handle: { type: Sequelize.STRING },
  twitterId: {type: Sequelize.STRING },
  profilePic: {type: Sequelize.STRING, defaultValue: ''},
  backgroundPic: {type: Sequelize.STRING, defaultValue: ''},
  followers: { type: Sequelize.INTEGER, defaultValue: 0 },
  followersChange: { type: Sequelize.INTEGER, defaultValue: 0 },
  score: { type: Sequelize.INTEGER, defaultValue: 0 },
  scoreChange: { type: Sequelize.INTEGER, defaultValue: 0 }
});

module.exports.sync();
