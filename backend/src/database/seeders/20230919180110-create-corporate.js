/* eslint-disable camelcase */
/* eslint-disable max-lines-per-function */
// 'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, _Sequelize) {
    await queryInterface.bulkInsert('corporates', [
      {
        data: '2023-08-31',
        empresa: 'Bh Airport',
        evento: '15 anos Copa',
        contratante: 'Lilian',
        local: 'Aeroporto Confins',
        cidade: 'Belo Horizonte',
        imagem: null,
        primeiro_backup_bruto: 1,
        primeiro_backup_bruto_tamanho: 20,
        segundo_backup_bruto: 2,
        segundo_backup_bruto_tamanho: 20,
        primeiro_backup: null,
        primeiro_backup_tamanho: 0,
        segundo_backup: null,
        segundo_backup_tamanho: 0,
      },
      {
        data: '2023-08-30',
        empresa: 'Unimed',
        evento: 'Unimed Talks',
        contratante: 'Celine',
        local: 'Sede Administrativa',
        cidade: 'Belo Horizonte',
        imagem: null,
        primeiro_backup_bruto: null,
        primeiro_backup_bruto_tamanho: 0,
        segundo_backup_bruto: null,
        segundo_backup_bruto_tamanho: 0,
        primeiro_backup: 3,
        primeiro_backup_tamanho: 13,
        segundo_backup: 4,
        segundo_backup_tamanho: 13,
      },
    ], {});
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.bulkDelete('corporates', null, {});
  },
};
