'use strict';
module.exports = (sequelize, DataTypes) => {
  let Post = sequelize.define('Post', {
    posterId: DataTypes.STRING,
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    picture: DataTypes.STRING,
    video: DataTypes.STRING,
    likes: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function (models) {
        models.Post.belongsTo(models.User, {
          foreignKey: "userId", as: "user", onDelete: "CASCADE"
        }, { allowNull: "false" });

      }
    }
  });
  return Post;
};