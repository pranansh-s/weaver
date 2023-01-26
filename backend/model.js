const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    id: {
        required: true,
        type: Number
    },
    title: {
        required: true,
        type: String
    },
    date: {
        required: true,
        type: String
    },
    image: {
        required: true,
        type: String
    },
    tags: {
        required: true,
        type: Array
    },
})

module.exports = mongoose.model('Data', dataSchema)