import { QueryInterface } from "sequelize";

export default {
	async up(queryInterface: QueryInterface, DataTypes: any) {
		queryInterface.addColumn("Address", "userId", { type: DataTypes.UUID, allowNull: false, references: { model: "User", key: "id" } });
	},

	async down(queryInterface: QueryInterface, DataTypes: any) {
		queryInterface.removeColumn("Address", "userId");
	},
};
