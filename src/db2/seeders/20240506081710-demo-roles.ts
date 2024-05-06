import { QueryInterface } from "sequelize";

export default {
	async up(queryInterface: QueryInterface, DataType: any) {
		await queryInterface.bulkInsert("Roles", [{ name: "demo-admin" }, { name: "demo-sales-rep" }]);
	},

	async down(queryInterface: QueryInterface, DataType: any) {
		await queryInterface.bulkDelete("Roles", { name: /demo/i }, {});
	},
};
