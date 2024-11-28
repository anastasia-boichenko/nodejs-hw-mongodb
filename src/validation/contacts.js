import Joi from 'joi';

import { contactTypeOptions } from '../constants/contacts.js';

export const createContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).required().messages({
    'string.base': 'Name should be a string',
    'string.min': 'Name should have at least {#limit} characters',
    'string.max': 'Name should have at most {#limit} characters',
    'any.required': 'Name is required',
  }),
  phoneNumber: Joi.string().min(3).max(20).required().messages({
    'string.base': 'Phone number should be a string',
    'string.min': 'Phone number should have at least {#limit} characters',
    'string.max': 'Phone number should have at most {#limit} characters',
    'any.required': 'Phone number is required',
  }),
  email: Joi.string().min(3).max(20).messages({
    'string.base': 'Email should be a string',
    'string.min': 'Email should have at least {#limit} characters',
    'string.max': 'Email should have at most {#limit} characters',
  }),
  isFavourite: Joi.boolean().messages({
    'boolean.base': 'Favourite field should be a boolean value',
  }),
  contactType: Joi.string()
    .min(3)
    .max(20)
    .valid(...contactTypeOptions)
    .messages({
      'string.base': 'Contact type should be a string',
      'string.min': 'Contact type should have at least {#limit} characters',
      'string.max': 'Contact type should have at most {#limit} characters',
      'any.only': 'Contact type must be one of the allowed values',
    }),
});

export const updateContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).messages({
    'string.base': 'Name should be a string',
    'string.min': 'Name should have at least {#limit} characters',
    'string.max': 'Name should have at most {#limit} characters',
    'any.required': 'Name is required',
  }),
  phoneNumber: Joi.string().min(3).max(20).messages({
    'string.base': 'Phone number should be a string',
    'string.min': 'Phone number should have at least {#limit} characters',
    'string.max': 'Phone number should have at most {#limit} characters',
    'any.required': 'Phone number is required',
  }),
  email: Joi.string().min(3).max(20).messages({
    'string.base': 'Email should be a string',
    'string.min': 'Email should have at least {#limit} characters',
    'string.max': 'Email should have at most {#limit} characters',
  }),
  isFavourite: Joi.boolean().messages({
    'boolean.base': 'Favourite field should be a boolean value',
  }),
  contactType: Joi.string()
    .min(3)
    .max(20)
    .valid(...contactTypeOptions)
    .messages({
      'string.base': 'Contact type should be a string',
      'string.min': 'Contact type should have at least {#limit} characters',
      'string.max': 'Contact type should have at most {#limit} characters',
      'any.only': 'Contact type must be one of the allowed values',
    }),
});
