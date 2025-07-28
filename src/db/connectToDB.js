const mongoose = require("mongoose");
console.log(process.env.MONGO_URI);

const connectToDB = () => mongoose.connect(process.env.MONGO_URI);

module.exports = connectToDB;