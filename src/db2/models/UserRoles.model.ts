import { DataTypes } from "sequelize";
import { connection } from "../connection.js";

const UserRole = connection.define(
	"UserRole",
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
			references: {
				model: "Roles",
				key: "id",
			},
		},
		userId: {
			type: DataTypes.UUID,
			allowNull: false,
			references: {
				model: "User",
				key: "id",
			},
		},
	},
	{ freezeTableName: true },
);

export { UserRole };
