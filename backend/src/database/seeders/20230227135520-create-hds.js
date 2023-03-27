/* eslint-disable max-lines-per-function */
// 'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, _Sequelize) {
   await queryInterface.bulkInsert('hds', [
    {
     name: '1',
     label: 'Sata',
     capacity: 500,
     used: 325,
     available: 175,
    },
    {
      name: '2',
      label: 'Sata',
      capacity: 500,
      used: 430,
      available: 70,
     },
     {
      name: '3',
      label: 'Sata',
      capacity: 500,
      used: 460,
      available: 40,
     },
     {
      name: '4',
      label: 'Samsung',
      capacity: 1000,
      used: 920,
      available: 80,
     },
     {
      name: '5',
      label: 'Sata',
      capacity: 500,
      used: 250,
      available: 250,
     },

  ], {});
  },

  async down(queryInterface, _Sequelize) {
   await queryInterface.bulkDelete('hds', null, {});
  },
};
