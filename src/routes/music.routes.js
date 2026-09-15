const express = require('express')
const router = express.Router()
const musicController = require('../controllers/music.controller')


router.post('/uploads',musicController.uploadMusic)




module.exports = router