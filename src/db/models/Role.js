import { DataTypes } from "sequelize";
import { dbInstance } from "../instance.js";

const RoleModel = dbInstance.define("Roles", {
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
})

export default RoleModel;