"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      const { UserRole, Address, AadharCard } = models;
      this.hasMany(UserRole, {
        foreignKey: "userId",
      });
      this.hasMany(Address, {
        foreignKey: "userId",
      });
      this.belongsTo(AadharCard, {
        foreignKey: "aadharId",
        onDelete: "CASCADE",
        hooks: true,
      });
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        unique: true,
        primaryKey: true,
      },
      full_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      country_code: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      aadharId: {
        type: DataTypes.UUID,
        allowNull: true,
      },
      combo: {
        type: DataTypes.VIRTUAL,
        get() {
          return `${this.full_name} - ${this.country_code}`;
        },
        set() {
          throw new Error("Do not try to set virtual fields");
        },
      },
    },
    {
      sequelize,
      freezeTableName: true,
      tableName: "User",
      modelName: "User",
    },
  );
  return User;
};
