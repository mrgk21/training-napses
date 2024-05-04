import { DataTypes } from "sequelize";
import { dbInstance } from "../instance.js";

const AadharCardModel = dbInstance.define("AadharCardDetails", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        unique: true,
        primaryKey: true
    },
    aadharNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

// AadharCardModel.belongsTo(UserModel, {foreignKey: "aadharId", onDelete: "cascade"})

export default AadharCardModel;