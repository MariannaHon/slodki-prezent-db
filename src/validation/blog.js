import Joi from 'joi';

const addBlogErrorMessages = {
  'string.base': 'Field {#label} must be a string.',
  'string.empty': 'Field {#label} cannot be empty.',
  'any.required': 'Missing required {#label} field.',
  'boolean.base': 'Field {#label} must be a boolean value (true/false).',
  'date.base': 'Field {#label} must be a valid date string.',
};

export const createBlogSchema = Joi.object({
  title: Joi.string().trim().required().messages(addBlogErrorMessages),

  description: Joi.string().trim().required().messages(addBlogErrorMessages),

  text: Joi.string().trim().required().messages(addBlogErrorMessages),

  photo: Joi.string().allow('').messages(addBlogErrorMessages),

  category: Joi.string().trim().required().messages(addBlogErrorMessages),

  popular: Joi.boolean().required().messages(addBlogErrorMessages),

  date: Joi.string().trim().required().messages(addBlogErrorMessages),
});

export const updateBlogSchema = Joi.object({
  title: Joi.string().trim(),

  description: Joi.string().trim(),

  text: Joi.string().trim(),

  photo: Joi.string().allow(''),

  category: Joi.string().trim(),

  popular: Joi.boolean(),

  date: Joi.string().trim(),
});

