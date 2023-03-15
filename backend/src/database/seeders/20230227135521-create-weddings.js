/* eslint-disable camelcase */
/* eslint-disable max-lines-per-function */
// 'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, _Sequelize) {
   await queryInterface.bulkInsert('weddings', [
    {
      data: '10/07/2013',
      noiva: 'Salua',
      noivo: 'Tiago',
      imagem: 'Frontend/ftwentytwo-app/src/assets/images/casamentos/20130710_Salua_Tiago.jpg',
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
      data: '14/12/2018',
      noiva: 'Ana',
      noivo: 'Mateus',
      imagem: 'Frontend/ftwentytwo-app/src/assets/images/casamentos/20181214_Ana_Mateus.jpg',
      cidade: 'Belo Horizonte',
      local_cerimonia: 'Espaço Meet',
      local_recepcao: 'Espaço Meet',
      primeiro_backup_bruto: 10,
      primeiro_backup_bruto_tamanho: 42,
      segundo_backup_bruto: 9,
      segundo_backup_bruto_tamanho: 42,
      primeiro_backup: 9,
      primeiro_backup_tamanho: 18,
      segundo_backup: 8,
      segundo_backup_tamanho: 10,
     },
     {
      data: '13/11/2021',
      noiva: 'Luisa',
      noivo: 'Marcelo',
      imagem: 'Frontend/ftwentytwo-app/src/assets/images/casamentos/20211113_Luisa_Marcelo.png',
      cidade: 'Belo Horizonte',
      local_cerimonia: 'Casa Bedrock',
      local_recepcao: 'Casa Bedrock',
      primeiro_backup_bruto: 10,
      primeiro_backup_bruto_tamanho: 35,
      segundo_backup_bruto: 2,
      segundo_backup_bruto_tamanho: 35,
      primeiro_backup: 10,
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
