const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    static associate(models) {
      const { Comment } = models;
      this.hasMany(Comment, {
        foreignKey: "commentableId",
        constraints: false,
        scope: {
          commentableType: "Image",
        },
      });
    }
  }

  Image.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        unique: true,
        primaryKey: true,
      },
      url: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      height: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      width: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      freezeTableName: true,
      modelName: "Image",
      tableName: "Image",
    },
  );
  return Image;
};
