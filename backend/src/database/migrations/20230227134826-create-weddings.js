// 'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('weddings', { 
      id: { type: Sequelize.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
      data: { type: Sequelize.STRING, allowNull: false },
      noiva: { type: Sequelize.STRING, allowNull: false },
      noivo: { type: Sequelize.STRING, allowNull: false },
      imagem: { type: Sequelize.STRING, allowNull: false },
      cidade: { type: Sequelize.STRING, allowNull: false },
      localCerimonia: { type: Sequelize.STRING, field: 'local_cerimonia' },
      localRecepcao: { type: Sequelize.STRING, field: 'local_recepcao' },
      primeiroBackupBruto: { type: Sequelize.INTEGER, field: 'primeiro_backup_bruto' },
      // eslint-disable-next-line max-len
      primeiroBackupBrutoTamanho: { type: Sequelize.INTEGER, field: 'primeiro_backup_bruto_tamanho' },
      segundoBackupBruto: { type: Sequelize.INTEGER, field: 'segundo_backup_bruto' },
      segundoBackupBrutoTamanho: { type: Sequelize.INTEGER, field: 'segundo_backup_bruto_tamanho' },
      primeiroBackup: { type: Sequelize.INTEGER, field: 'primeiro_backup' },
      primeiroBackupTamanho: { type: Sequelize.INTEGER, field: 'primeiro_backup_tamanho' },
      segundoBackup: { type: Sequelize.INTEGER, field: 'segundo_backup' },
      segundoBackupTamanho: { type: Sequelize.INTEGER, field: 'segundo_backup_tamanho' },
    });
  },

  async down(queryInterface, _Sequelize) {
   await queryInterface.dropTable('weddings');
  },
};
