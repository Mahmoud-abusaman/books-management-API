const { StatusCodes } = require("http-status-codes");
const { Book } = require("../../models");
const { BadRequestError, NotFoundError } = require("../../utils/errors");
const { updateBookSchema } = require("../../utils/validation/books");

const updateBook = async (req, res) => {
  const { error } = updateBookSchema.validate(req.body, { abortEarly: false });
  if (error) {
    const message = error.details.map((err) => err.message).join(", ");
    throw new BadRequestError(message);
  }

  const {
    user: { id: userId },
    params: { id: bookId },
    body: { title, author, status },
  } = req;

  const book = await Book.findOneAndUpdate(
    { _id: bookId, createdBy: userId },
    { title, author, status },
    {
      new: true,
      runValidators: true,
    }
  );
  if (!book) {
    throw new NotFoundError("Book not found");
  }

  res.status(StatusCodes.OK).json({ success: true, data: { book } });
};

module.exports = updateBook;
