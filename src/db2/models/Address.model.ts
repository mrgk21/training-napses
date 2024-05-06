import { DataTypes } from "sequelize";
import { connection } from "../connection.js";

const Address = connection.define(
	"Address",
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
		street: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		city: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		country: {
			type: DataTypes.STRING,
			allowNull: false,
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

export { Address };
