
var Sequelize = require('sequelize');
var sql = require('../connection.js');

module.exports = sql.define('twitter', {
  fullName: { type: Sequelize.STRING, allowNull: false, primaryKey: true },
  score: { type: Sequelize.FLOAT, defaultValue: 0},
  scoreChange: { type: Sequelize.FLOAT, defaultValue: 0},
  handle: { type: Sequelize.STRING },
  twitterId: {type: Sequelize.STRING },
  profilePic: {type: Sequelize.STRING, defaultValue: ''},
  backgroundPic: {type: Sequelize.STRING, defaultValue: ''},
  followers: { type: Sequelize.INTEGER, defaultValue: 0 },
  followersChange: { type: Sequelize.INTEGER, defaultValue: 0 }
});

module.exports.sync();
