const { StatusCodes } = require("http-status-codes");
const User = require("../../models/User");
const { BadRequestError } = require("../../utils/errors");
const { registerSchema } = require("../../utils/validation/auth");

const register = async (req, res) => {
  const { error } = registerSchema.validate(req.body, { abortEarly: false });
  if (error) {
    const errors = error.details.map((d) => d.message);
    throw new BadRequestError(errors.join(", "));
  }

  const { name, email, password } = req.body;

  const user = await User.create({ name, email, password });

  const token = user.signToken();

  res.status(StatusCodes.CREATED).json({ success: true, data: { token } });
};

module.exports = register;
