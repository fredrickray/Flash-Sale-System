import Joi from 'joi';

export const createProductValidationSchema = Joi.object({
  name: Joi.string().required(),
  totalUnit: Joi.number(),
  startDate: Joi.date(),
  startTime: Joi.string().pattern(/^([01]\d|2[0-3]):([0-5]\d)$/), // 24-hour format
  isActive: Joi.boolean(),
});

export const updateProductValidationSchema = Joi.object({
  name: Joi.string(),
  totalUnit: Joi.number(),
  startDate: Joi.date(),
  startTime: Joi.string().pattern(/^([01]\d|2[0-3]):([0-5]\d)$/), // 24-hour format
  isActive: Joi.boolean(),
}).min(1); // At least one field must be provided
