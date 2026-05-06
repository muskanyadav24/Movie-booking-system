const mongoose = require('mongoose')

const connectDb = () => {
    console.log(process.env.DB_CONNECTION_URL)
    return mongoose.connect(process.env.DB_CONNECTION_URL).then(() => {
        console.log("database connected successfully")
    }
    ).catch((err) => {
        console.log("database is not connected", err)
        throw err
    })
}
module.exports = connectDb;