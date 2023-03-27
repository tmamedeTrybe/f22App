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
    up(queryInterface, _Sequelize) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryInterface.bulkInsert('hds', [
                {
                    name: '1',
                    label: 'Sata',
                    capacity: 500,
                    used: 325,
                    available: 175,
                },
                {
                    name: '2',
                    label: 'Sata',
                    capacity: 500,
                    used: 430,
                    available: 70,
                },
                {
                    name: '3',
                    label: 'Sata',
                    capacity: 500,
                    used: 460,
                    available: 40,
                },
                {
                    name: '4',
                    label: 'Samsung',
                    capacity: 1000,
                    used: 920,
                    available: 80,
                },
                {
                    name: '5',
                    label: 'Sata',
                    capacity: 500,
                    used: 250,
                    available: 250,
                },
            ], {});
        });
    },
    down(queryInterface, _Sequelize) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryInterface.bulkDelete('hds', null, {});
        });
    },
};
