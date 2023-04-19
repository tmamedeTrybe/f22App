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
            yield queryInterface.bulkInsert('weddings', [
                {
                    data: '10/07/2013',
                    noiva: 'Salua',
                    noivo: 'Tiago',
                    imagem: 'Salua_Tiago.jpg',
                    cidade: 'Belo Horizonte',
                    local_cerimonia: 'Chateau Belvedere',
                    local_recepcao: 'Chateau Belvedere',
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
                    data: '14/12/2018',
                    noiva: 'Ana',
                    noivo: 'Mateus',
                    imagem: 'Ana_Mateus.jpg',
                    cidade: 'Belo Horizonte',
                    local_cerimonia: 'Espaço Meet',
                    local_recepcao: 'Espaço Meet',
                    primeiro_backup_bruto: 3,
                    primeiro_backup_bruto_tamanho: 42,
                    segundo_backup_bruto: 5,
                    segundo_backup_bruto_tamanho: 42,
                    primeiro_backup: 3,
                    primeiro_backup_tamanho: 18,
                    segundo_backup: 5,
                    segundo_backup_tamanho: 10,
                },
                {
                    data: '13/11/2021',
                    noiva: 'Luisa',
                    noivo: 'Marcelo',
                    imagem: 'Luisa_Marcelo.jpg',
                    cidade: 'Belo Horizonte',
                    local_cerimonia: 'Casa Bedrock',
                    local_recepcao: 'Casa Bedrock',
                    primeiro_backup_bruto: 5,
                    primeiro_backup_bruto_tamanho: 35,
                    segundo_backup_bruto: 2,
                    segundo_backup_bruto_tamanho: 35,
                    primeiro_backup: 5,
                    primeiro_backup_tamanho: 20,
                    segundo_backup: 4,
                    segundo_backup_tamanho: 7,
                },
            ], {});
        });
    },
    down(queryInterface, _Sequelize) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryInterface.bulkDelete('weddings', null, {});
        });
    },
};
