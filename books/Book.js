const mongoose = require("mongoose")

// Schemas
const BookSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    author: {
        type: String,
        require: true
    },
    numberPages: {
        type: Number,
        require: true
    },
    publisher: {
        type: String,
        require: true
    }
})

// Models
const Book = mongoose.model("Book", BookSchema)

module.exports = Book

