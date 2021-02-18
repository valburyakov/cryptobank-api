import Joi from 'joi';

export const userSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  username: Joi.string().alphanum().required(),
});

export const updateUserSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  username: Joi.string().alphanum(),
});

export const usdSchema = Joi.object({
  action: Joi.string().valid('deposit', 'withdraw').required(),
  amount: Joi.number().positive().required(),
});

export const bitcoinSchema = Joi.object({
  action: Joi.string().valid('buy', 'sell').required(),
  amount: Joi.number().positive().required(),
});

export const bitcoinUpdateSchema = Joi.object({
  price: Joi.number().positive().required(),
});
