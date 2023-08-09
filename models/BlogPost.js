const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/connection");

class BlogPost extends Model {}

BlogPost.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contents: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author_name: {
      type: DataTypes.STRING,
      references: {
        model: "user",
        key: "name",
      },
    },
  },
  {
    sequelize,
    freezeTableName: true,
    modelName: "blog_post",
  }
);

module.exports = BlogPost;