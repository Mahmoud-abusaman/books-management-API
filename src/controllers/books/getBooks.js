const { StatusCodes } = require("http-status-codes");
const { Book } = require("../../models");

const getBooks = async (req, res) => {
  const {
    query: { status, page = 1 },
    user: { id },
  } = req;

  const filterObject = { createdBy: id };

  if (status) {
    filterObject.status = status;
  }

  const limit = 9;
  const skip = (Number(page) - 1) * limit;

  const books = await Book.find(filterObject)
    .sort("-createdAt")
    .skip(skip)
    .limit(limit)
    .lean();

  const totalBooks = await Book.countDocuments(filterObject);

  const totalPages = Math.ceil(totalBooks / limit);

  res.status(StatusCodes.OK).json({
    success: true,
    data: {
      count: books.length,
      page: Number(page),
      totalPages,
      totalBooks,
      books,
    },
  });
};

module.exports = getBooks;
