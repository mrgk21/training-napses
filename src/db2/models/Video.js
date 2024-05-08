const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Video extends Model {
    static associate(models) {
      const { Comment } = models;
      this.hasMany(Comment, {
        foreignKey: "commentableId",
        constraints: false,
        scope: {
          commentableType: "Video",
        },
      });
    }
  }

  Video.init(
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
      duration: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      freezeTableName: true,
      modelName: "Video",
      tableName: "Video",
    },
  );
  return Video;
};
