import Joi from 'joi';

const addOccasionErrorMessages = {
  'string.base': 'Field {#label} must be a string.',
  'string.empty': 'Field {#label} cannot be empty.',
  'any.required': 'Missing required {#label} field.',
};

export const createHolidaySchema = Joi.object({
  name: Joi.string().trim().required().messages(addOccasionErrorMessages),

  description: Joi.string().trim().required().messages(addOccasionErrorMessages),

  img: Joi.string().allow('').messages(addOccasionErrorMessages),
});

export const updateHolidaySchema = Joi.object({
  name: Joi.string().trim(),

  description: Joi.string().trim(),

  img: Joi.string().allow(''),
});
