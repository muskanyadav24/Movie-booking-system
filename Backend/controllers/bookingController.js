const Booking = require('../models/bookingModel')
const Movie = require('../models/movieModel')

const bookMovie = async (req, res) => {
    try {
        const { movieId, seats, showDate } = req.body
        const userId = req.user.id

        if (!movieId || !seats || !showDate) {
            return res.status(400).json({ message: "all fields required" })
        }

        const movie = await Movie.findById(movieId)

        if (!movie) {
            return res.status(404).json({ message: "movie not found" })
        }

        const pricePerSeat = movie.price || 200
        const totalAmount = seats * pricePerSeat

        const booking = await Booking.create({
            user: userId,
            movie: movieId,
            seats,
            showDate,
            totalAmount
        })

        res.status(201).json({
            message: "booking successful",
            booking
        })

    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

const cancelBooking = async (req, res) => {
    try {
        const { bookingId } = req.body
        const userId = req.user.id

        const booking = await Booking.findById(bookingId)

        if (!booking) {
            return res.status(404).json({ message: "Booking not found" })
        }

        if (booking.user.toString() !== userId) {
            return res.status(403).json({ message: "Not authorized" })
        }

        if (booking.status === "cancelled") {
            return res.status(400).json({ message: "Already cancelled" })
        }

        const now = new Date()
        const showDate = new Date(booking.showDate)

        const diffMs = showDate - now
        const diffHours = diffMs / (1000 * 60 * 60)

        let refundPercent = 0

        if (diffHours >= 24) refundPercent = 80
        else if (diffHours >= 12) refundPercent = 60
        else if (diffHours >= 8) refundPercent = 50
        else if (diffHours >= 6) refundPercent = 40
        else if (diffHours >= 4) refundPercent = 30
        else if (diffHours >= 3) refundPercent = 20
        else refundPercent = 0

        const refundAmount = (booking.totalAmount * refundPercent) / 100

        booking.status = "cancelled"
        booking.refundAmount = refundAmount

        await booking.save()

        res.status(200).json({
            message: "booking cancelled",
            refundPercent,
            refundAmount
        })

    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

const getBookings = async (req, res) => {
    const userId = req.user.id
    const data = await Booking.find({ user: userId })
        .populate('user', 'username email')
        .populate('movie', 'title price')

    res.status(200).json({ data })
}

module.exports = { bookMovie, cancelBooking, getBookings }