
/****************
  Twitter Model
****************/

/* * Imports * */

var Sequelize = require('sequelize');
var sql = require('../connection.js');

/* * Schema * */

module.exports = sql.define('twitter', {
  fullName: { type: Sequelize.STRING, allowNull: false, primaryKey: true },
  handle: { type: Sequelize.STRING },
  twitterId: {type: Sequelize.STRING },
  profilePic: {type: Sequelize.STRING, defaultValue: '' },
  tweets: { type: Sequelize.ARRAY(Sequelize.TEXT), defaultValue: [] },
  backgroundPic: {type: Sequelize.STRING, defaultValue: '' },
  followers: { type: Sequelize.INTEGER, defaultValue: 0 },
  followerschange: { type: Sequelize.INTEGER, defaultValue: 0 },
  score: { type: Sequelize.INTEGER, defaultValue: 0 },
  scorechange: { type: Sequelize.INTEGER, defaultValue: 0 },
  scorehour: { type: Sequelize.ARRAY(Sequelize.INTEGER), defaultValue: [] },
  scoreday: { type: Sequelize.ARRAY(Sequelize.INTEGER), defaultValue: [] },
  scoreweek: { type: Sequelize.ARRAY(Sequelize.INTEGER), defaultValue: [] },
  scoremonth: { type: Sequelize.ARRAY(Sequelize.INTEGER), defaultValue: [] }
});

module.exports.sync();
