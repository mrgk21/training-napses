"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    queryInterface.addColumn("Address", "userId", { type: DataTypes.UUID, aallowNull: false, references: { model: "User", key: "id" } });
  },

  async down(queryInterface, DataTypes) {
    queryInterface.removeColumn("Address", "userId");
  },
};
