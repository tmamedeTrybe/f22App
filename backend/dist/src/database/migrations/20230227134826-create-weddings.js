"use strict";
/* eslint-disable max-lines-per-function */
// 'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up(queryInterface, Sequelize) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryInterface.createTable('weddings', {
                id: { type: Sequelize.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
                data: { type: Sequelize.STRING, allowNull: false },
                noiva: { type: Sequelize.STRING, allowNull: false },
                noivo: { type: Sequelize.STRING, allowNull: false },
                imagem: { type: Sequelize.STRING, allowNull: false },
                cidade: { type: Sequelize.STRING, allowNull: false },
                localCerimonia: { type: Sequelize.STRING, field: 'local_cerimonia' },
                localRecepcao: { type: Sequelize.STRING, field: 'local_recepcao' },
                primeiroBackupBruto: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    field: 'primeiro_backup_bruto',
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE',
                    references: {
                        model: 'hds',
                        key: 'id',
                    },
                },
                // eslint-disable-next-line max-len
                primeiroBackupBrutoTamanho: { type: Sequelize.INTEGER, field: 'primeiro_backup_bruto_tamanho' },
                segundoBackupBruto: { type: Sequelize.INTEGER, field: 'segundo_backup_bruto' },
                segundoBackupBrutoTamanho: { type: Sequelize.INTEGER, field: 'segundo_backup_bruto_tamanho' },
                primeiroBackup: { type: Sequelize.INTEGER, field: 'primeiro_backup' },
                primeiroBackupTamanho: { type: Sequelize.INTEGER, field: 'primeiro_backup_tamanho' },
                segundoBackup: { type: Sequelize.INTEGER, field: 'segundo_backup' },
                segundoBackupTamanho: { type: Sequelize.INTEGER, field: 'segundo_backup_tamanho' },
            });
        });
    },
    down(queryInterface, _Sequelize) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryInterface.dropTable('weddings');
        });
    },
};
