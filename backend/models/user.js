//j'importe le package de cryptage bcrypt pour hasher mot de passe
const bcrypt = require('bcrypt');

'use strict';
module.exports = (sequelize, DataTypes) => {
  let User = sequelize.define('User',{
    email: DataTypes.STRING,
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    password: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN,
  }, {
    timestamps: true
  },{
    ClassMethods: {
      associate: function(models){
        models.User.hasMany(models.Post);
        // define association here
      }
    }
  });

  /*crypter mot de passe
  User.pre("save",)
  */
  return User;
};