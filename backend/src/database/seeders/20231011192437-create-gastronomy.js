/* eslint-disable camelcase */
/* eslint-disable max-lines-per-function */
// 'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, _Sequelize) {
    await queryInterface.bulkInsert('gastronomies', [
      {
        data: '20210718',
        empresa: 'Un altra volta',
        evento: 'Festival de risotos',
        contato: 'Poliana',
        local: 'Un altra volta',
        cidade: 'Belo Horizonte',
        imagem: null,
        primeiro_backup_bruto: null,
        primeiro_backup_bruto_tamanho: 0,
        segundo_backup_bruto: null,
        segundo_backup_bruto_tamanho: 0,
        primeiro_backup: null,
        primeiro_backup_tamanho: 0,
        segundo_backup: null,
        segundo_backup_tamanho: 0,
     },
     {
      data: '20210922',
      empresa: 'Pastelaria Marilia',
      evento: 'Banco de imagens',
      contato: 'Renata',
      local: 'Pastelaria',
      cidade: 'Belo Horizonte',
      imagem: null,
      primeiro_backup_bruto: null,
      primeiro_backup_bruto_tamanho: 0,
      segundo_backup_bruto: null,
      segundo_backup_bruto_tamanho: 0,
      primeiro_backup: null,
      primeiro_backup_tamanho: 0,
      segundo_backup: null,
      segundo_backup_tamanho: 0,
   },
    ], {});
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.bulkDelete('gastronomies', null, {});
  },
};
