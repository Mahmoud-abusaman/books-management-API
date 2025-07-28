const { StatusCodes } = require("http-status-codes");
const { JsonWebTokenError } = require("jsonwebtoken");
const mongoose = require("mongoose");
const { CustomError } = require("../../utils/errors");

const errorHandler = (err, req, res, next) => {
  console.log(err);

  const customError = {
    message: "Somthing went wrong, try again later",
    statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
  };

  if (err instanceof CustomError) {
    customError.message = err.message;
    customError.statusCode = err.statusCode;
  }

  if (err instanceof JsonWebTokenError) {
    customError.message = "Unauthenticated, please login";
    customError.statusCode = StatusCodes.UNAUTHORIZED;
  }

  if (err instanceof mongoose.Error.ValidationError) {
    const message = Object.values(err.errors)
      .map((error) => error.message)
      .join(", ");

    customError.message = message;
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }

  if (err.code === 11000) {
    const duplicatedField = Object.keys(err.keyValue)[0];

    if (duplicatedField === "email") {
      customError.message = "This email is already registered";
    } else {
      customError.message = `Duplicate value for '${duplicatedField}' field`;
    }

    customError.statusCode = StatusCodes.BAD_REQUEST;
  }

  res
    .status(customError.statusCode)
    .json({ success: false, error: customError.message });
};

module.exports = errorHandler;
