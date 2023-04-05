// 'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('hds', {
      id: { type: Sequelize.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
      name: { type: Sequelize.STRING },
      label: { type: Sequelize.STRING, allowNull: false },
      capacity: { type: Sequelize.INTEGER, allowNull: false },
      used: { type: Sequelize.INTEGER, allowNull: false },
      available: { type: Sequelize.INTEGER, allowNull: false },
    });
  },

  async down(queryInterface, _Sequelize) {
   await queryInterface.dropTable('hds');
  },
};
