const express = require("express");
const BookModel = require("../model/books.model");



let BookRouter = express.Router();

//Public
BookRouter.get("/all-book",async (req, res) => {
    try {
        let book = await BookModel.find();
        res.status(200).json({ msg: "book list", book })
    } catch (error) {
      console.log(error.message);
    } 

})


module.exports = BookRouter;