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
                    data: '20130710',
                    noiva: 'Salua',
                    noivo: 'Tiago',
                    imagem: 'Frontend/ftwentytwo-app/src/assets/images/casamentos/20130710_Salua_Tiago.jpg',
                    cidade: 'Belo Horizonte',
                    local_cerimonia: 'Chateau Belvedere',
                    local_recepcao: 'Chateau Belvedere',
                    primeiro_backup_bruto: 2,
                    primeiro_backup: 2,
                    segundo_backup: 4,
                },
                {
                    data: '20181214',
                    noiva: 'Ana',
                    noivo: 'Mateus',
                    imagem: 'Frontend/ftwentytwo-app/src/assets/images/casamentos/20181214_Ana_Mateus.jpg',
                    cidade: 'Belo Horizonte',
                    local_cerimonia: 'Espaço Meet',
                    local_recepcao: 'Espaço Meet',
                    primeiro_backup: 10,
                    segundo_backup: 9,
                },
                {
                    data: '20211113',
                    noiva: 'Luisa',
                    noivo: 'Marcelo',
                    imagem: 'Frontend/ftwentytwo-app/src/assets/images/casamentos/20211113_Luisa_Marcelo.png',
                    cidade: 'Belo Horizonte',
                    local_cerimonia: 'Casa Bedrock',
                    local_recepcao: 'Casa Bedrock',
                    primeiro_backup: 12,
                    segundo_backup: 10,
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
