"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      const { UserRoles, Address, AadharCard } = models;
      this.hasMany(UserRoles, {
        foreignKey: "userId",
      });
      this.hasMany(Address, {
        foreignKey: "userId",
      });
      this.belongsTo(AadharCard, {
        foreignKey: "aadharId",
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
        type: DataTypes.STRING,
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
