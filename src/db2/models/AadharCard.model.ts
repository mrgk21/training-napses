import { DataTypes } from "sequelize";
import { connection } from "../connection.js";

const AadharCard = connection.define(
	"AadharCard",
	{
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			allowNull: false,
			unique: true,
			primaryKey: true,
		},
		aadharNumber: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{ freezeTableName: true },
);

export { AadharCard };
