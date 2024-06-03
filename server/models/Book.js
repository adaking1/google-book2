const { Schema } = require('mongoose');

const bookSchema = new Schema({
    authors: [
        {
            type: String
        }
    ],
    description: {
        type: String,
        required: true
    },
    bookId: {
        type: String,
        requires: true
    },
    image: {
        type: String
    },
    link: {
        type: String
    },
    title: {
        type: String,
        required: true
    }
});

module.exports = bookSchema;