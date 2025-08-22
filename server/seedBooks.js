const mongoose = require("mongoose");
const BookModel = require("./model/books.model");
require("dotenv").config();

const booksData = require("./books.json").books;

mongoose.connect(process.env.MOngo_URI)
  .then(async () => {
    console.log("Connected to MongoDB");
    await BookModel.deleteMany({}); // clear old books
    await BookModel.insertMany(booksData); // insert sample books
    console.log("Books seeded successfully!");
    mongoose.disconnect();
  })
  .catch(err => console.log(err.message));
