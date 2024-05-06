import { DataTypes } from "sequelize";
import { connection } from "../connection.js";

const User = connection.define(
	"User",
	{
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			allowNull: false,
			unique: true,
			primaryKey: true,
		},
		full_name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		country_code: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		aadharId: {
			type: DataTypes.UUID,
			allowNull: true,
			references: {
				model: "AadharCard",
				key: "id",
			},
		},
	},
	{ freezeTableName: true },
);

export { User };
