const { StatusCodes } = require("http-status-codes");
const { Book } = require("../../models");
const { NotFoundError } = require("../../utils/errors");

const deleteBook = async (req, res) => {
  const {
    user: { id: userId },
    params: { id: bookId },
  } = req;

  const result = await Book.deleteOne({ _id: bookId, createdBy: userId });
  if (result.deletedCount !== 1) {
    throw new NotFoundError("Book not found");
  }

  res
    .status(StatusCodes.OK)
    .json({ success: true, data: { message: "Book deleted successfully" } });
};

module.exports = deleteBook;
