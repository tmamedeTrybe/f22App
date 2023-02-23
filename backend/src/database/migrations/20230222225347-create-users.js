// 'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: { 
        type: Sequelize.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING, allowNull: false,
      },
      role: {
        type: Sequelize.STRING, allowNull: false,
      },
      email: {
        type: Sequelize.STRING, allowNull: false,
      },
      password: {
        type: Sequelize.STRING, allowNull: false,
      },
      });
  },

  async down(queryInterface, _Sequelize) {
   await queryInterface.dropTable('users');
  },
};
