'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class userRoles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  userRoles.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUID4,
        allowNull: false,
        primaryKey: true
    },
    roleId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: "Role",
            key: "id"
        }
    },
    roleId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: "User",
            key: "id"
        }
    },
  }, {
    sequelize,
    freezeTableName: true,
    tableName: "UserRoles",
    modelName: 'userRoles',
  });
  return userRoles;
};