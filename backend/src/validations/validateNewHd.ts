import newHd from "../interfaces/newHd";
const Joi = require('joi');

const validateNewHd = (newHd: newHd) => 
    Joi.object({
			// name: Joi.string().required().messages({
			// 	'string.required': 'Informe o nome do hd',
			// }),
			label: Joi.string().required().messages({
				'string.required': 'Informe a marca ou tipo do HD'
			}),
			capacity: Joi.number().min(500).required().messages({
				'number.min': '500 deve ser o menor numero em GB',
				'number.required': 'Informe a capacidade em GB do HD'
			}),
		}).validate(newHd);


export default validateNewHd;