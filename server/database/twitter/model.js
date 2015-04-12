
/****************
  Twitter Model
****************/

/* * Imports * */

var Sequelize = require('sequelize');
var sql = require('../connection.js');

/* * Schema * */

module.exports = sql.define('twitter', {
  fullName: { type: Sequelize.STRING, allowNull: false, primaryKey: true },
  score: { type: Sequelize.FLOAT, defaultValue: 0},
  scorechange: { type: Sequelize.FLOAT, defaultValue: 0},
  handle: { type: Sequelize.STRING },
  twitterId: {type: Sequelize.STRING },
  profilePic: {type: Sequelize.STRING, defaultValue: ''},
  backgroundPic: {type: Sequelize.STRING, defaultValue: ''},
  followers: { type: Sequelize.INTEGER, defaultValue: 0 },
  followerschange: { type: Sequelize.INTEGER, defaultValue: 0 }
});

module.exports.sync();
