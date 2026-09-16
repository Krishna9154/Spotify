const express = require('express')
const router = express.Router()
const musicController = require('../controllers/music.controller')
const authArtistMiddleware = require('../middleware/authArtist.middleware')
const authUserMiddleware =require('../middleware/authUser.middleware')


router.post('/uploads',authArtistMiddleware.authArtist ,musicController.uploadMusic)

router.post('/album',authArtistMiddleware.authArtist ,musicController.createAlbum)

router.get('/',authUserMiddleware.authUser ,musicController.getMusic)




module.exports = router