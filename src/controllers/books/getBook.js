const { StatusCodes } = require("http-status-codes");
const { Book } = require("../../models");
const { NotFoundError } = require("../../utils/errors");

const getBook = async (req, res) => {
  const {
    user: { id: userId },
    params: { id: bookId },
  } = req;

  const book = await Book.findOne({ _id: bookId, createdBy: userId })
    .populate("createdBy")
    .lean();
  if (!book) {
    throw new NotFoundError("Book not found");
  }

  res.status(StatusCodes.OK).json({ success: true, data: { book } });
};

module.exports = getBook;
