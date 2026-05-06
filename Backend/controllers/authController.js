const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const register = async (req, res) => {
    try {

        const { username, email, password, role } = req.body

        const isuser = await User.findOne({
            $or: [
                { email },
                { username }
            ]
        }
        )

        if (isuser) {
            return res.status(400).json({
                message: "Email or username already exists"
            })
        }

        if (!username || !email || !password) {
            return res.status(400).json({
                message: "all fields required"
            })
        }

        const hashPass = await bcrypt.hash(password, 10)
        const user = await User.create({ username, email, "password": hashPass, role: role || 'user' })

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' })

        return res.status(201).json({
            "message": "user created successfully",
            token,
            user: { id: user._id, username: user.username, email: user.email, role: user.role }
        })
    } catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({
                message: "all fields required"
            })
        }

        const user = await User.findOne({ email })

        if (!user) {
            return res.status(400).json({
                message: "user not found"
            })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.status(400).json({
                message: "invalid credentials"
            })
        }

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' })

        return res.status(200).json({
            message: "login successful",
            token,
            user: { id: user._id, username: user.username, email: user.email, role: user.role }
        })

    } catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }
}

module.exports = { register, login }