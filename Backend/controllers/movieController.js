const Movie = require('../models/movieModel')

const addMovie = async (req, res) => {
    const { title, description, showtime, price, image } = req.body

    try {
        if (!title || !description || !showtime || !price || !image) {
            return res.status(400).json({ message: "all fields required" })
        }
        const movie = await Movie.create({ title, description, releaseDate: new Date(showtime), price, posterUrl: image })
        res.status(201).json({ message: "movie added", movie })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

const getMovies = async (req, res) => {
    const movies = await Movie.find()
    res.status(200).json({ movies })
}

module.exports = { addMovie, getMovies }