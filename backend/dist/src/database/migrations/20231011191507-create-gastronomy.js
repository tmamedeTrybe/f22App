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
            yield queryInterface.createTable('gastronomies', {
                id: { type: Sequelize.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
                date: {
                    type: Sequelize.DATEONLY,
                    allowNull: false,
                    get() {
                        return this.getDataValue('data')
                            .toLocaleString('en-GB');
                    },
                },
                company: { type: Sequelize.STRING, allowNull: false },
                event: { type: Sequelize.STRING, allowNull: false },
                contact: { type: Sequelize.STRING, allowNull: false },
                venue: { type: Sequelize.STRING, allowNull: false },
                city: { type: Sequelize.STRING, allowNull: false },
                image: { type: Sequelize.STRING, allowNull: true },
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
        });
    },
    down(queryInterface, _Sequelize) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryInterface.dropTable('gastronomies');
        });
    },
};
