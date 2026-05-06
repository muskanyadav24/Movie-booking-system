const mongoose = require('mongoose')

const movieSchema = new mongoose.Schema({
    title: String,
    description: String,
    durationInMinutes: Number,
    genre: String,
    language: String,
    releaseDate: Date,
    posterUrl: String,
    price: {
        type: Number,
        default: 200
    }
}, { timestamps: true })

module.exports = mongoose.model('Movie', movieSchema)