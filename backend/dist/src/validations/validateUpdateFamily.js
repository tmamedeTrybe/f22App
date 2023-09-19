"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const validateUpdateFamily = (newInfo) => joi_1.default.object({
    data: joi_1.default.date().min(8).required().messages({
        'date': 'O formato da "Data" deve ser "YYYYMMDD"',
        'string.required': 'Informar a data do evento',
    }),
    categoria: joi_1.default.string().min(3).messages({
        'string.min': '"Categoria" dever ter ao menos três letras',
        'string-required': 'Informar a categoria do evento'
    }),
    nome: joi_1.default.string().min(3).messages({
        'string.min': '"Nome" dever ter ao menos três letras',
        'string-required': 'Informar o nome'
    }),
    contratante: joi_1.default.string().min(3).messages({
        'string.min': '"Contratante" dever ter ao menos três letras',
        'string-required': 'Informar o contratante do evento'
    }),
    local: joi_1.default.string().min(3).messages({
        'string.min': '"Local" dever ter ao menos três letras',
        'string-required': 'Informar o local do evento'
    }),
    primeiroBackupBruto: joi_1.default.number().allow(null),
    primeiroBackupBrutoTamanho: joi_1.default.number().messages({
        'number': '"primeiroBackupBrutoTamanho" deve ser um número inteiro',
    }),
    segundoBackupBruto: joi_1.default.number().allow(null).invalid(joi_1.default.ref('primeiroBackupBruto')).error(new Error('"PrimeiroBackupBruto" e "SegundoBackupBruto" devem estar em Hd´s diferentes')),
    segundoBackupBrutoTamanho: joi_1.default.number().messages({
        'number': '"segundoBackupBrutoTamanho" deve ser um número inteiro',
    }),
    primeiroBackup: joi_1.default.number().allow(null),
    primeiroBackupTamanho: joi_1.default.number().messages({
        'number': '"primeiroBackupTamanho" deve ser um número inteiro',
    }),
    segundoBackup: joi_1.default.number().allow(null).invalid(joi_1.default.ref('primeiroBackup')).error(new Error('"primeiroBackup" e "segundoBackup" devem estar em Hd´s diferentes')),
    segundoBackupTamanho: joi_1.default.number().messages({
        'number': '"segundoBackupTamanho" deve ser um número inteiro',
    }),
}).validate(newInfo);
exports.default = validateUpdateFamily;
