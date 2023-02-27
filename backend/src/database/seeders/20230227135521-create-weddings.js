/* eslint-disable camelcase */
/* eslint-disable max-lines-per-function */
// 'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, _Sequelize) {
   await queryInterface.bulkInsert('weddings', [
    {
      data: '20130710',
      noiva: 'Salua',
      noivo: 'Tiago',
      local_cerimonia: 'Chateau Belvedere',
      local_recepcao: 'Chateau Belvedere',
      primeiro_backup_bruto: 2,
      primeiro_backup: 2,
      segundo_backup: 4,
     },
     {
      data: '20181214',
      noiva: 'Ana',
      noivo: 'Mateus',
      local_cerimonia: 'Espaço Meet',
      local_recepcao: 'Espaço Meet',
      primeiro_backup: 10,
      segundo_backup: 9,
     },
     {
      data: '20211113',
      noiva: 'Luisa',
      noivo: 'Marcelo',
      local_cerimonia: 'Casa Bedrock',
      local_recepcao: 'Casa Bedrock',
      primeiro_backup: 12,
      segundo_backup: 10,
     },
    ], {});
  },

  async down(queryInterface, _Sequelize) {
   await queryInterface.bulkDelete('weddings', null, {});
  },
};
