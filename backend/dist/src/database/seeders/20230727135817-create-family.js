"use strict";
/* eslint-disable max-lines-per-function */
/* eslint-disable camelcase */
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
            yield queryInterface.bulkInsert('families', [
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
        });
    },
    down(queryInterface, _Sequelize) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryInterface.bulkDelete('families', null, {});
        });
    },
};
