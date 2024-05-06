import { DataTypes } from "sequelize";
import { connection } from "../connection.js";

const Role = connection.define(
	"Role",
	{
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			allowNull: false,
			unique: true,
			primaryKey: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{ freezeTableName: true },
);

export { Role };
