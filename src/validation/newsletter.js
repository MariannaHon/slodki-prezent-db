import Joi from 'joi';

const addNewsletterErrorMessages = {
  'string.base': 'Field {#label} must be a string.',
  'string.empty': 'Field {#label} cannot be empty.',
    'any.required': 'Missing required {#label} field.',
  'string.email': 'Field {#label} must be a valid email address.',
};

export const createNewsletterSchema = Joi.object({
  email: Joi.string().email().trim().required().messages(addNewsletterErrorMessages),
});

export const updateNewsletterSchema = Joi.object({
  email: Joi.string().email().trim().messages(addNewsletterErrorMessages),
});