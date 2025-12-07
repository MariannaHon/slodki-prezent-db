
import Joi from 'joi';

const addPresentsErrorMessages = {
  'number.base': 'Field {#label} must be a number.',
  'string.empty': 'Field {#label} cannot be empty.',
  'any.required': 'Missing required {#label} field.',
  'array.base': 'Field {#label} must be an array.',
  'boolean.base': 'Field {#label} must be a boolean value (true/false).',
};

export const createPresentSchema = Joi.object({
  name: Joi.string().trim().required().messages(addPresentsErrorMessages),

  description: Joi.string().trim().required().messages(addPresentsErrorMessages),

  contains: Joi.array().items(Joi.string().trim().required()).min(1).required().messages(addPresentsErrorMessages),

  price: Joi.number().min(0).required().messages(addPresentsErrorMessages),

  oldPrice: Joi.number().min(0).required().messages(addPresentsErrorMessages),

  photo: Joi.string().allow('').messages(addPresentsErrorMessages),
  photo2: Joi.string().allow('').messages(addPresentsErrorMessages),
  photo3: Joi.string().allow('').messages(addPresentsErrorMessages),
  photo4: Joi.string().allow('').messages(addPresentsErrorMessages),

  new: Joi.boolean().required().messages(addPresentsErrorMessages),
  discount: Joi.boolean().required().messages(addPresentsErrorMessages),
  bestseller: Joi.boolean().required().messages(addPresentsErrorMessages),
});

export const updatePresentSchema = Joi.object({
  name: Joi.string().trim(),

  description: Joi.string().trim(),

  contains: Joi.array().items(Joi.string().trim()).min(1),

  price: Joi.number().min(0),

  oldPrice: Joi.number().min(0),

  photo: Joi.string().allow(''),
  photo2: Joi.string().allow(''),
  photo3: Joi.string().allow(''),
  photo4: Joi.string().allow(''),

  new: Joi.boolean(),
  discount: Joi.boolean(),
  bestseller: Joi.boolean(),
});
