const express = require('express')
const router = express.Router()

const { register, login } = require('../controllers/authController')
const { addMovie, getMovies } = require('../controllers/movieController')
const { bookMovie, cancelBooking, getBookings } = require('../controllers/bookingController')

// user
router.post('/register', register)
router.post('/login', login)

// movie
router.post('/add-movie', addMovie)
router.get('/movies', getMovies)

// booking
router.post('/book-movie', bookMovie)
router.post('/cancel-booking', cancelBooking)
router.get('/bookings', getBookings)

module.exports = router