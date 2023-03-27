"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Joi = require('joi');
const validateNewHd = (newHd) => Joi.object({
    name: Joi.string().required().messages({
        'string.required': 'Informe o nome do hd',
    }),
    label: Joi.string().required().messages({
        'string.required': 'Informe a marca ou tipo do HD'
    }),
    capacity: Joi.number().min(500).required().messages({
        'number.min': '500 deve ser o menor numero em GB',
        'number.required': 'Informe a capacidade em GB do HD'
    }),
    used: Joi.number().required().messages({
        'number.required': 'Informe GB usados do HD'
    }),
    // available: Joi.number().max(newHd.capacity).required().messages({
    // 	'number.max': 'Disponível não deve ser maior que a capacidade',
    // 	'number.required': 'Informe a capacidade em GB do HD'
    // }),
}).validate(newHd);
exports.default = validateNewHd;
