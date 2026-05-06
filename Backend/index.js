require('dotenv').config()
const express = require('express')
const cors = require('cors')  
const connectDb = require('./db/db')
const route = require('./routes/routes')

const app = express()
const port = process.env.PORT || 8001

// middleware
app.use(cors())  
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// routes
app.use("/", route)

// DB connect
connectDb()
  .then(() => {
    const User = require('./models/userModel')
    User.syncIndexes()
      .then(() => console.log('User indexes synced'))
      .catch((err) => console.log('Failed to sync user indexes', err))
  })
  .catch(() => {
    console.log('Startup aborted because DB connection failed')
  })

app.listen(port, () => {
    console.log(`server running on port ${port}`)
})