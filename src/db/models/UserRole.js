import { DataTypes } from "sequelize";
import { dbInstance } from "../instance.js";
import RoleModel from "./Role.js";
import UserModel from "./User.js";

const UserRoleModel = dbInstance.define("UserRoles", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        unique: true,
        primaryKey: true
    },
    roleId: {
        type: DataTypes.UUID,
        references: {
            model: RoleModel,
            key: "id"
        },
        allowNull: false,
    },
    userId: {
        type: DataTypes.UUID,
        references: {
            model: UserModel,
            key: "id"
        },
        allowNull: false,
    },
})

export default UserRoleModel;