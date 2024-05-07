'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Roles extends Model {

    static associate(models) {
      const {UserRoles} = models;

      this.hasMany(UserRoles, {
        foreignKey: "roleId" 
      })
    }
  }
  Roles.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        unique: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    }
  }, {
    sequelize,
    freezeTableName: true,
    tableName: "Roles",
    modelName: 'Roles',
  });
  return Roles;
};