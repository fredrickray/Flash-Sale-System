import Joi from 'joi';

export const purchaseValidationSchema = Joi.object({
  quantity: Joi.number().required().min(1).max(5),
  //   price: Joi.number().required(),
});
