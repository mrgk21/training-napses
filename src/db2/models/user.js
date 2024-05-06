
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  user.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        unique: true,
        primaryKey: true
    },
    full_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    country_code: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    aadharId:{
        type: DataTypes.UUID, 
        allowNull: true, 
            references: {
            model: "AadharCard",
            key: "id"
       }
    }
  }, {
    sequelize,
    freezeTableName: true,
    tableName: 'User',
    modelName: 'user',
  });
  return user;
};