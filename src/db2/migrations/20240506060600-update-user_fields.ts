import { QueryInterface } from "sequelize";

export default {
	async up(queryInterface: QueryInterface, DataTypes: any) {
		await queryInterface.addColumn("User", "full_name", { type: DataTypes.STRING, allowNull: true });
		await queryInterface.addColumn("User", "country_code", { type: DataTypes.INTEGER, allowNull: true });
		await queryInterface.addColumn("User", "aadharId", {
			type: DataTypes.UUID,
			allowNull: true,
			references: {
				model: "AadharCard",
				key: "id",
			},
		});
	},

	async down(queryInterface: QueryInterface, DataTypes: any) {
		await queryInterface.removeColumn("User", "full_name");
		await queryInterface.removeColumn("User", "country_code");
		await queryInterface.removeColumn("User", "aadharId");
	},
};
