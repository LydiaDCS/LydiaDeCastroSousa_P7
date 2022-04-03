//j'importe sequelize
const Sequelize = require('sequelize');
const db = require('../config/database');

const user = db.define('user', {
  nom:{
    type: Sequelize.STRING
  },
  prénom:{
    type: Sequelize.STRING
  },
  email:{
    type: Sequelize.STRING
  },
  password:{
    type: Sequelize.STRING
  }
});

module.exports = user;