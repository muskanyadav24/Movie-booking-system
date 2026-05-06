const Movie = require('../models/movieModel')

const addMovie = async (req, res) => {
    try {
        const { title, description, durationInMinutes, genre, language, releaseDate, posterUrl } = req.body

        if (!title || !description || !durationInMinutes || !genre || !language || !releaseDate || !posterUrl) {
            return res.status(400).json({ message: "all fields required" })
        }
        const movie = await Movie.create(req.body)
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