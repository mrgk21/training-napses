import { QueryInterface } from "sequelize";

export default {
	async up(queryInterface: QueryInterface, DataTypes: any) {
		await queryInterface.createTable("userRoles", {
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
			createdAt: {
				allowNull: false,
				type: DataTypes.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: DataTypes.DATE,
			},
		});
	},
	async down(queryInterface: QueryInterface, DataTypes: any) {
		await queryInterface.dropTable("userRoles");
	},
};
