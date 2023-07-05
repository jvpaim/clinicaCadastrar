// db/connection.js

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('nodepjf', 'root', 'paim12345', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;
