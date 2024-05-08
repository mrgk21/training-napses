"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserRoles extends Model {
    static associate(models) {
      const { Roles, User } = models;
      this.belongsTo(Roles, {
        foreignKey: "roleId",
      });
      this.belongsTo(User, {
        foreignKey: "userId",
      });
    }
  }
  UserRoles.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      roleId: {
        type: DataTypes.UUID,
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
      tableName: "UserRoles",
      modelName: "UserRole",
    },
  );
  return UserRoles;
};
