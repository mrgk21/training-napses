"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Address extends Model {
    static associate(models) {
      const { User } = models;
      this.belongsTo(User, {
        foreignKey: "userId",
      });
    }
  }
  Address.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        unique: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      street: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      country: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
    },
    {
      sequelize,
      freezeTableName: true,
      tableName: "Address",
      modelName: "Address",
    },
  );
  return Address;
};
