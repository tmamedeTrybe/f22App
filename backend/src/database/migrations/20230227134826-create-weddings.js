// 'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('weddings', { 
      id: { type: Sequelize.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
      data: { type: Sequelize.DATE, allowNull: false },
      noiva: { type: Sequelize.STRING, allowNull: false },
      noivo: { type: Sequelize.STRING, allowNull: false },
      localCerimonia: { type: Sequelize.STRING, field: 'local_cerimonia' },
      localRecepcao: { type: Sequelize.STRING, field: 'local_recepcao' },
      primeiroBackupBruto: { type: Sequelize.INTEGER, field: 'primeiro_backup_bruto' },
      segundoBackupBruto: { type: Sequelize.INTEGER, field: 'segundo_backup_bruto' },
      primeiroBackup: { type: Sequelize.INTEGER, field: 'primeiro_backup' },
      segundoBackup: { type: Sequelize.INTEGER, field: 'segundo_backup' },
    });
  },

  async down(queryInterface, _Sequelize) {
   await queryInterface.dropTable('weddings');
  },
};
