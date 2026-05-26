import Joi from 'joi';

const addBlogErrorMessages = {
  'string.base': 'Field {#label} must be a string.',
  'string.empty': 'Field {#label} cannot be empty.',
  'any.required': 'Missing required {#label} field.',
  'boolean.base': 'Field {#label} must be a boolean value (true/false).',
  'date.base': 'Field {#label} must be a valid date string.',
  'array.includes': 'Field {#label} must include at least one valid type.',
};

export const createBlogSchema = Joi.object({
  title: Joi.string().trim().required().messages(addBlogErrorMessages),

  description: Joi.string().trim().required().messages(addBlogErrorMessages),

  text: Joi.string().trim().required().messages(addBlogErrorMessages),

  photo: Joi.string().allow('').messages(addBlogErrorMessages),

  category: Joi.string().trim().required().messages(addBlogErrorMessages),

  popular: Joi.boolean().required().messages(addBlogErrorMessages),

  date: Joi.string().trim().required().messages(addBlogErrorMessages),

  type: Joi.array()
    .items(Joi.string().valid('all', 'events', 'advices', 'inspirations', 'insites'))
    .min(1)
    .required()
    .messages(addBlogErrorMessages),

});

export const updateBlogSchema = Joi.object({
  title: Joi.string().trim(),

  description: Joi.string().trim(),

  text: Joi.string().trim(),

  photo: Joi.string().allow(''),

  category: Joi.string().trim(),

  popular: Joi.boolean(),

  date: Joi.string().trim(),

  type: Joi.array()
    .items(Joi.string().valid('all', 'events', 'advices', 'inspirations', 'insites'))
    .min(1)
    .messages(addBlogErrorMessages),
});

