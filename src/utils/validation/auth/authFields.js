const Joi = require("joi");

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const name = Joi.string()
  .trim()
  .lowercase()
  .min(3)
  .max(30)
  .required()
  .messages({
    "string.empty": "Please provide a name",
    "string.min": "Name should be at least 3 characters",
    "string.max": "Name should be at most 30 characters",
    "any.required": "Please provide a name",
  });

const email = Joi.string().pattern(emailPattern).required().messages({
  "string.empty": "Please provide email",
  "string.pattern.base": "Please provide a valid email address",
  "any.required": "Please provide email",
});

const password = Joi.string().min(6).max(30).required().messages({
  "string.empty": "Please provide password",
  "string.min": "Password must be at least 6 characters",
  "string.max": "Password cannot be more than 30 characters",
  "any.required": "Please provide password",
});

module.exports = { name, password, email };
