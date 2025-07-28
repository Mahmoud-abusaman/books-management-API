const Joi = require("joi");

const createBookSchema = Joi.object({
  title: Joi.string().trim().min(1).max(30).required().messages({
    "string.empty": "Please provide the book title",
    "string.min": "Book title should be at least 1 characters",
    "string.max": "Book title should be at most 30 characters",
    "any.required": "Please provide the book title",
  }),

  author: Joi.string().trim().min(1).max(30).required().messages({
    "string.empty": "Please provide the book author",
    "string.min": "Author name should be at least 1 characters",
    "string.max": "Author name should be at most 30 characters",
    "any.required": "Please provide the book author",
  }),

  status: Joi.string().valid("interested", "reading", "finished").messages({
    "any.only": "Status must be one of: interested, reading, finished",
  }),
});

module.exports = createBookSchema;
