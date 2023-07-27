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
     ], {});
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.bulkDelete('families', null, {});
  },
};
