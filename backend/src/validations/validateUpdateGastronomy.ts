import Joi from 'joi';
import gastronomy from '../interfaces/gastronomy';

const validateUpdateGastronomy = (newInfo: gastronomy) =>
  Joi.object({
    data: Joi.date().min(8).required().messages({
      'date': 'O formato da Data deve ser "YYYYMMDD',
      'string.required': 'Informar a data do evento',
    }),
    empresa: Joi.string().min(3).messages({
      'string-min': '"Company" deve ter ao menos três letras',
      'string-required': 'Informar a empresa contratante',
    }),
    evento: Joi.string().min(3).messages({
      'string-min': '"Event" deve ter ao menos três letras',
      'string-required': 'Informar o nome do evento',
    }),
    contato: Joi.string().min(3).messages({
      'string-min': '"Contact" deve ter ao menos três letras',
      'string-required': 'Informar o contato contratante',
    }),
    local: Joi.string().min(3).messages({
      'string-min': '"Venue" deve ter ao menos três letras',
      'string-required': 'Informar o local do evento',
    }),
    cidade: Joi.string().min(3).messages({
      'string-min': '"City" deve ter ao menos três letras',
      'string-required': 'Informar a cidade do evento',
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

  export default validateUpdateGastronomy;