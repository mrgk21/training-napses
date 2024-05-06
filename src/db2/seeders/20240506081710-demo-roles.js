'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Roles", [
        { name: "demo-admin" },
        { name: "demo-sales-rep" },
    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Roles", {name: /demo/i }, {})
  }
};
