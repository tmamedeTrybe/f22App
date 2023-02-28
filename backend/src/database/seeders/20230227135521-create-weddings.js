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
      primeiro_backup: 2,
      segundo_backup: 4,
     },
     {
      data: '14/12/2018',
      noiva: 'Ana',
      noivo: 'Mateus',
      imagem: 'Frontend/ftwentytwo-app/src/assets/images/casamentos/20181214_Ana_Mateus.jpg',
      cidade: 'Belo Horizonte',
      local_cerimonia: 'Espaço Meet',
      local_recepcao: 'Espaço Meet',
      primeiro_backup: 10,
      segundo_backup: 9,
     },
     {
      data: '13/11/2021',
      noiva: 'Luisa',
      noivo: 'Marcelo',
      imagem: 'Frontend/ftwentytwo-app/src/assets/images/casamentos/20211113_Luisa_Marcelo.png',
      cidade: 'Belo Horizonte',
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
