'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class roles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  roles.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUID4,
        allowNull: false,
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
    modelName: 'roles',
  });
  return roles;
};