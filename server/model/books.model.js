const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
    "title": { type: String, required: true},
    "author": { type: String, required: true},
    "coverImage":{ type: String},
    "availability":{ type: Boolean, default:true},
});

const BookModel = mongoose.model("Books", BookSchema);

module.exports = BookModel;