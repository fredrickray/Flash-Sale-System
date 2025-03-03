import Joi from 'joi';

export const signupValidationSchema = Joi.object({
  firstName: Joi.string().min(3).required(),
  lastName: Joi.string().min(3).required(),
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(5).required(),
});

export const signinValidationSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
