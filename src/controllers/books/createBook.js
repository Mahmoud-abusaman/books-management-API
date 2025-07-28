const { StatusCodes } = require("http-status-codes");
const { Book } = require("../../models");
const { BadRequestError } = require("../../utils/errors");
const { createBookSchema } = require("../../utils/validation/books");

const createBook = async (req, res) => {
  const { error } = createBookSchema.validate(req.body, { abortEarly: false });
  if (error) {
    const message = error.details.map((err) => err.message).join(", ");
    throw new BadRequestError(message);
  }

  const {
    user: { id },
    body: { title, author, status },
  } = req;

  const book = await Book.create({
    title,
    author,
    status,
    createdBy: id,
  });

  res.status(StatusCodes.CREATED).json({ success: true, data: { book } });
};

module.exports = createBook;
