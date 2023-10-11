/* eslint-disable camelcase */
/* eslint-disable max-lines-per-function */
// 'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, _Sequelize) {
    await queryInterface.bulkInsert('gastronomies', [
      {
        date: '20210718',
        company: 'Un altra volta',
        event: 'Festival de risotos',
        contact: 'Poliana',
        venue: 'Un altra volta',
        city: 'Belo Horizonte',
        image: null,
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
      date: '20210922',
      company: 'Pastelaria Marilia',
      event: 'Banco de imagens',
      contact: 'Renata',
      venue: 'Pastelaria',
      city: 'Belo Horizonte',
      image: null,
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
