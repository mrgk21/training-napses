"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class AadharCard extends Model {
    static associate(models) {
      const { User } = models;
      this.hasOne(User, {
        foreignKey: "aadharId",
        onDelete: "CASCADE",
        hooks: true,
      });
    }
  }
  AadharCard.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        unique: true,
        primaryKey: true,
      },
      aadharNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      freezeTableName: true,
      tableName: "AadharCardDetails",
      modelName: "AadharCard",
    },
  );
  return AadharCard;
};
