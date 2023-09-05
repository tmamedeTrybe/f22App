import Joi from 'joi';
import familyUpdate from '../interfaces/familyUpdate';

const validateUpdateFamily = (newInfo: familyUpdate) => 
  Joi.object({
    data: Joi.date().min(8).required().messages({
      'date': 'O formato da "Data" deve ser "YYYYMMDD"',
      'string.required': 'Informar a data do evento',
    }),
    categoria: Joi.string().min(3).messages({
      'string.min': '"Categoria" dever ter ao menos três letras',
      'string-required': 'Informar a categoria do evento'
    }),
    nome: Joi.string().min(3).messages({
      'string.min': '"Nome" dever ter ao menos três letras',
      'string-required': 'Informar o nome'
    }),
    contratante: Joi.string().min(3).messages({
      'string.min': '"Contratante" dever ter ao menos três letras',
      'string-required': 'Informar o contratante do evento'
    }),
    local: Joi.string().min(3).messages({
      'string.min': '"Local" dever ter ao menos três letras',
      'string-required': 'Informar o local do evento'
    }),
    primeiroBackupBruto: Joi.number().allow(null),
    primeiroBackupBrutoTamanho: Joi.number().messages({
      'number': '"primeiroBackupBrutoTamanho" deve ser um número inteiro',
    }),
    segundoBackupBruto: Joi.number().allow(null).invalid(Joi.ref('primeiroBackupBruto')).error(
      new Error('"PrimeiroBackupBruto" e "SegundoBackupBruto" devem estar em Hd´s diferentes')),
      segundoBackupBrutoTamanho: Joi.number().messages({
        'number': '"segundoBackupBrutoTamanho" deve ser um número inteiro',
    }),
    primeiroBackup: Joi.number().allow(null),
    primeiroBackupTamanho: Joi.number().messages({
      'number': '"primeiroBackupTamanho" deve ser um número inteiro',
    }),
    segundoBackup: Joi.number().allow(null).invalid(Joi.ref('primeiroBackup')).error(
      new Error('"primeiroBackup" e "segundoBackup" devem estar em Hd´s diferentes')),
    segundoBackupTamanho: Joi.number().messages({
      'number': '"segundoBackupTamanho" deve ser um número inteiro',
    }),
  }).validate(newInfo);


export default validateUpdateFamily;