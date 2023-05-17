import newUser from '../interfaces/newUser';
const Joi = require('joi');

const validateNewUser = (newUser: newUser) =>
Joi.object({
  name: Joi.string().min(3).required().messages({
    'string.min': '"Name" length must be at least 3 characters long',
    'string.required': '"displayName" length must be at least 8 characters long',
  }),
  email: Joi.string().email().required().messages({
      'string.min': '"email" must be a valid email',
      'string.required': '"email" must be a valid email',
    }),
  role: Joi.string().min(4).required().messages({
  'string.min': '"Role" length must be at least 4 characters long',
  'string.required': '"Role" length must be at least 6 characters long',
  }),
  password: Joi.string().min(6).required().messages({
    'string.min': '"password" length must be at least 6 characters long',
    'string.required': '"password" length must be at least 6 characters long',
  }),
}).validate(newUser);

export default validateNewUser;
