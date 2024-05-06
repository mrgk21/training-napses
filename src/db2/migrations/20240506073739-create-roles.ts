import { QueryInterface } from "sequelize";
export default {
	async up(queryInterface: QueryInterface, DataTypes: any) {
		await queryInterface.createTable("roles", {
			id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				allowNull: false,
				primaryKey: true,
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false,
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
		await queryInterface.dropTable("roles");
	},
};
