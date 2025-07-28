const Joi = require("joi");
const { email, password } = require("./authFields");

const loginSchema = Joi.object({
  email,
  password,
});

module.exports = loginSchema;
