/* eslint-disable camelcase */
/* eslint-disable max-lines-per-function */
// 'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, _Sequelize) {
   await queryInterface.bulkInsert('weddings', [
    {
      data: '2013-07-15',
      noiva: 'Salua',
      noivo: 'Tiago',
      imagem: 'wedding-icon.jpg',
      cidade: 'Belo Horizonte',
      local_cerimonia: 'Chateau Belvedere',
      local_recepcao: 'Chateau Belvedere',
      primeiro_backup_bruto: 2,
      primeiro_backup_bruto_tamanho: 20,
      segundo_backup_bruto: 2,
      segundo_backup_bruto_tamanho: 20,
      primeiro_backup: 2,
      primeiro_backup_tamanho: 13,
      segundo_backup: 4,
      segundo_backup_tamanho: 3,
     },
     {
      data: '2018-12-14',
      noiva: 'Ana',
      noivo: 'Mateus',
      imagem: 'wedding-icon.jpg',
      cidade: 'Belo Horizonte',
      local_cerimonia: 'Espaço Meet',
      local_recepcao: 'Espaço Meet',
      primeiro_backup_bruto: 3,
      primeiro_backup_bruto_tamanho: 42,
      segundo_backup_bruto: 5,
      segundo_backup_bruto_tamanho: 42,
      primeiro_backup: 3,
      primeiro_backup_tamanho: 18,
      segundo_backup: 5,
      segundo_backup_tamanho: 10,
     },
     {
      data: '2021-11-13',
      noiva: 'Luisa',
      noivo: 'Marcelo',
      imagem: 'wedding-icon.jpg',
      cidade: 'Belo Horizonte',
      local_cerimonia: 'Casa Bedrock',
      local_recepcao: 'Casa Bedrock',
      primeiro_backup_bruto: 5,
      primeiro_backup_bruto_tamanho: 35,
      segundo_backup_bruto: 2,
      segundo_backup_bruto_tamanho: 35,
      primeiro_backup: 5,
      primeiro_backup_tamanho: 20,
      segundo_backup: 4,
      segundo_backup_tamanho: 7,
     },
    ], {});
  },

  async down(queryInterface, _Sequelize) {
   await queryInterface.bulkDelete('weddings', null, {});
  },
};
