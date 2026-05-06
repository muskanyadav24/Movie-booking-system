const mongoose = require('mongoose')

const bookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    movie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie',
        required: true
    },
    seats: {
        type: Number,
        required: true
    },
    showDate: {
        type: Date,
        required: true
    },
    totalAmount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ["booked", "cancelled"],
        default: "booked"
    },
    refundAmount: {
        type: Number,
        default: 0
    }
}, { timestamps: true })

module.exports = mongoose.model('Booking', bookingSchema)