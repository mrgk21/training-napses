import { DataTypes } from "sequelize";
import { dbInstance } from "../instance.js";
import AadharCardModel from "./AadharCard.js";

const UserModel = dbInstance.define("User", {
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
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    mobile: {
        type: DataTypes.STRING(13), // assumed thta the phone number is of size 10 digits + 2 country code + 1 for future use
        allowNull: false,
    },
    aadharId: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
            model: AadharCardModel,
            key: "id"
        }
    }
});

// UserModel.hasOne(AadharCardModel, {as: "aadharId"});

export default UserModel;