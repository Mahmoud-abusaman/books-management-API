const jwt = require("jsonwebtoken");
const { User } = require("../../models");
const { UnauthenticatedError } = require("../../utils/errors");

const authenticateUser = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthenticatedError("Unauthenticated, please login");
  }

  const token = authHeader.split("Bearer ")[1];

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const user = await User.findById(decoded.id);
  if (!user) {
    throw new UnauthenticatedError("User no longer exists, please login again");
  }

  req.user = {
    id: user.id,
    name: user.name,
  };

  next();
};

module.exports = authenticateUser;
