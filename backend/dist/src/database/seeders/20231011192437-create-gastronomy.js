"use strict";
/* eslint-disable camelcase */
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
    up(queryInterface, _Sequelize) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryInterface.bulkInsert('gastronomies', [
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
        });
    },
    down(queryInterface, _Sequelize) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryInterface.bulkDelete('gastronomies', null, {});
        });
    },
};
