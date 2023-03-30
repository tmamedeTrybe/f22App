"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Joi = require('joi');
const validateNewWedding = (newWedding) => Joi.object({
    data: Joi.string().min(10).required().messages({
        'string.min': 'O formato da "Data" deve ser "DD/MM/AAAA',
        'string.required': 'Informar a "data"',
    }),
    cidade: Joi.string().min(3).required().messages({
        'string.min': '"cidade" deve ter ao menos três letras',
        'string.required': 'Informar a "cidade"',
    }),
    noiva: Joi.string().min(3).required().messages({
        'string.min': '"noiva" deve ter ao menos três letras',
        'string.required': 'Informar a "noiva"',
    }),
    noivo: Joi.string().min(3).required().messages({
        'string.min': '"noivo" deve ter ao menos três letras',
        'string.required': 'Informar a "noivo"',
    }),
    // // imagem: Joi.string().min(3).messages({
    // //   'string.min': '"imagem" deve ser um caminho da imagem salva',
    // // }),
    // localCerimonia: Joi.string().min(3).messages({
    //   'string.min': '"localCerimonia" deve ter ao menos três letras',
    // }),
    // localRecepcao: Joi.string().min(3).messages({
    //   'string.min': '"localRecepcao" deve ter ao menos três letras',
    // }),
    // primeiroBackupBruto: Joi.number().messages({
    //   'number': '"primeiroBackupBruto" deve ser um número inteiro',
    // }),
    // primeiroBackupBrutoTamanho: Joi.number().messages({
    //   'number': '"primeiroBackupBrutoTamanho" deve ser um número inteiro',
    // }),
    // segundoBackupBruto: Joi.number().messages({
    //   'number': '"segundoBackupBruto" deve ser um número inteiro',
    // }),
    // segundoBackupBrutoTamanho: Joi.number().messages({
    //   'number': '"segundoBackupBrutoTamanho" deve ser um número inteiro',
    // }),
    // primeiroBackup: Joi.number().messages({
    //   'number': '"primeiroBackup" deve ser um número inteiro',
    // }),
    // primeiroBackupTamanho: Joi.number().messages({
    //   'number': '"primeiroBackupTamanho" deve ser um número inteiro',
    // }),
    // segundoBackup: Joi.number().messages({
    //   'number': '"segundoBackup" deve ser um número inteiro',
    // }),
    // segundoBackupTamanho: Joi.number().messages({
    //   'number': '"segundoBackupTamanho" deve ser um número inteiro',
    // }),
}).validate(newWedding);
exports.default = validateNewWedding;
