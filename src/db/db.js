const mongoose = require('mongoose')


async function connectToDb(){
    await mongoose.connect(process.env.DB_URI)
    console.log("DB is connected successfully")
}

module.exports = connectToDb