/* eslint-disable max-lines-per-function */
// 'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
   await queryInterface.createTable('families', { 
     id: { type: Sequelize.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
     data: {
      type: Sequelize.DATEONLY,
      allowNull: false,
      get() {
        return this.getDataValue('data')
        .toLocaleString('en-GB');
      },
    },
    categoria: { type: Sequelize.STRING, allowNull: false },
    nome: { type: Sequelize.STRING, allowNull: false },
    contratante: { type: Sequelize.STRING, allowNull: false },
    imagem: { type: Sequelize.STRING, allowNull: true },
    local: { type: Sequelize.STRING },
    primeiroBackupBruto: { 
      type: Sequelize.INTEGER,
      field: 'primeiro_backup_bruto',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      defaultValue: null,
      references: {
        model: 'hds',
        key: 'id',
      },
    },
    primeiroBackupBrutoTamanho: { 
      type: Sequelize.INTEGER,
      field: 'primeiro_backup_bruto_tamanho',
      defaultValue: 0,
    },
    segundoBackupBruto: { 
      type: Sequelize.INTEGER,
      field: 'segundo_backup_bruto',
      defaultValue: null,
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      references: {
        model: 'hds',
        key: 'id',
      },
    },
    segundoBackupBrutoTamanho: { 
      type: Sequelize.INTEGER,
      field: 'segundo_backup_bruto_tamanho',
      defaultValue: 0,
    },
    primeiroBackup: { 
      type: Sequelize.INTEGER,
      field: 'primeiro_backup',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      defaultValue: null,
      references: {
        model: 'hds',
        key: 'id',
      },
    },
    primeiroBackupTamanho: {
      type: Sequelize.INTEGER,
      field: 'primeiro_backup_tamanho',
      defaultValue: 0,
     },
     segundoBackup: { 
      type: Sequelize.INTEGER,
      field: 'segundo_backup',
      defaultValue: null,
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      references: {
        model: 'hds',
        key: 'id',
      },
    },
    segundoBackupTamanho: { 
      type: Sequelize.INTEGER,
      field: 'segundo_backup_tamanho',
      defaultValue: 0,
     },
    });
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.dropTable('families');
  },
};
