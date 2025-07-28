const Joi = require("joi");
const { name, email, password } = require("./authFields");

const registerSchema = Joi.object({
  name,
  email,
  password,
});

module.exports = registerSchema;
