"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.addColumn("User", "email", { type: DataTypes.STRING, allowNull: true });
  },

  async down(queryInterface, DataTypes) {
    await queryInterface.removeColumn("User", "email");
  },
};
