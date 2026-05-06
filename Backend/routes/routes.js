const express = require('express')
const router = express.Router()

const { register, login } = require('../controllers/authController')
const { addMovie, getMovies } = require('../controllers/movieController')
const { bookMovie, cancelBooking, getBookings } = require('../controllers/bookingController')
const { authenticate, authorize } = require('../middleware/auth')

// user
router.post('/register', register)
router.post('/login', login)

// movie
router.post('/add-movie', authenticate, authorize(['admin']), addMovie)
router.get('/movies', getMovies)

// booking
router.post('/book-movie', authenticate, bookMovie)
router.post('/cancel-booking', authenticate, cancelBooking)
router.get('/bookings', authenticate, getBookings)

module.exports = router