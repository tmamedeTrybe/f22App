/* eslint-disable max-lines-per-function */
/* eslint-disable camelcase */
// 'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, _Sequelize) {
   await queryInterface.bulkInsert('families', [
    {
      data: '2013-07-16',
      categoria: 'Aniversario 03 anos',
      nome: 'Miguel',
      contratante: 'Flavia',
      imagem: null,
      local: 'Casa do sol',
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
      data: '2010-09-22',
      categoria: 'Batizado',
      nome: 'Alice',
      contratante: 'Amanda',
      imagem: null,
      local: 'Igreja de Lourdes',
      primeiro_backup_bruto: 1,
      primeiro_backup_bruto_tamanho: 20,
      segundo_backup_bruto: 3,
      segundo_backup_bruto_tamanho: 20,
      primeiro_backup: null,
      primeiro_backup_tamanho: 0,
      segundo_backup: null,
      segundo_backup_tamanho: 0,
    },
     ], {});
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.bulkDelete('families', null, {});
  },
};
