'use strict';
module.exports = (sequelize, DataTypes) => {
  let User = sequelize.define('User',{
    email: DataTypes.STRING,
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    password: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN
  },{
    ClassMethods: {
      associate: function(models){
        models.User.hasMany(models.Message);
        // define association here
      }
    }
  });
  return User;
};