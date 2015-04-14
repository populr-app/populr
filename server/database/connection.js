
var Sequelize = require('sequelize');

var uri = 'postgres://localhost:5432/yourname';
if (process.env.PG_USER) uri = 'postgres://' + process.env.PG_USER + ':' + process.env.PG_PASSWORD + '@localhost:5432/test';
if (process.env.HEROKU_POSTGRESQL_AMBER_URL) uri = process.env.HEROKU_POSTGRESQL_AMBER_URL;

var sql = new Sequelize(uri, {
  logging: false
});

module.exports = sql;
