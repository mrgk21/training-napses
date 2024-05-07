'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserRoles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      const {Roles} = models;
      this.belongsTo(Roles, {
         foreignKey: "roleId",
      });
    }
  }
  UserRoles.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    roleId: {
        type: DataTypes.UUID,
        allowNull: false,
        // references: {
        //     model: "Roles",
        //     key: "id"
        // }
    },
    userId: {
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
    modelName: 'UserRoles',
  });
  return UserRoles;
};