'use strict';
module.exports = (sequelize, DataTypes) => {
  let like =sequelize.define('Like',{
    idUser: DataTypes.INTEGER,
    likes: DataTypes.STRING
  },{
classMethods:{
  associate:function(models){
    models.Post.belongsTo(models.User, {
      foreignKey:"userId", as: "user", onDelete:"CASCADE"
    }, {allowNull:"false"});
  
  }
}
  });
  return like;
};