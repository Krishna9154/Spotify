const express = require('express')
const authRoutes = require('./routes/auth.routes')
const musicRoutes = require('./routes/music.routes')
const cookieParser = require('cookie-parser')
const multer  = require('multer')


const app = express()
const upload = multer({
    storage: multer.memoryStorage()
});

app.use(express.json())
app.use(cookieParser())
app.use('/user',authRoutes)
app.use('/music', upload.single("musicfile"),musicRoutes)




module.exports = app