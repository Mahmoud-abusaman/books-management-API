const { StatusCodes } = require("http-status-codes");
const User = require("../../models/User");
const { UnauthenticatedError, BadRequestError } = require("../../utils/errors");
const { loginSchema } = require("../../utils/validation/auth");

const login = async (req, res) => {
  const { error } = loginSchema.validate(req.body, { abortEarly: false });
  if (error) {
    const errors = error.details.map((d) => d.message);
    throw new BadRequestError(errors.join(", "));
  }

  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new UnauthenticatedError(`Invalid Credentials`);
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new UnauthenticatedError(`Invalid Credentials`);
  }

  const token = user.signToken();

  res.status(StatusCodes.OK).json({ success: true, data: { token,user:user.name } });
};

module.exports = login;
