const musicModel = require('../models/music.model')
const albumModel = require('../models/album.model')
const jwt = require("jsonwebtoken")
const uriGenerator = require('../service/imageKit.service')


async function uploadMusic(req, res) {

    try {

        const user = req.user

        const result = await uriGenerator(req.file.buffer, req.file.originalname)

        const { title } = req.body

        const music = await musicModel.create({
            uri: result.url,
            title,
            artist: user.id,
        })

        return res.status(201).json({
            message: "Music is created",
            music: {
                id: music._id,
                uri: music.uri,
                title: music.title,
                artist: music.artist

            }
        })

    } catch (error) {
        return res.status(401).json({
            message: "Unauthorized User"
        })

    }

}

async function createAlbum(req, res) {

    try {
        const { title, musics } = req.body
        const user = req.user

        const album = await albumModel.create({
            title,
            artist: user.id,
            musics
        })

        return res.status(200).json({
            message: "Album is Created Successfully",
            album: {
                title: album.title,
                artist: album.artist,
                musics: album.musics
            }
        })

    } catch (error) {

        return res.status(401).json({
            message: "unauthorized user"
        })
    }
}

async function getMusic(req,res){

    const music = await musicModel.find()

    return res.status(200).json({
        message:"All songs List",
        music
    })

}


module.exports = { uploadMusic, createAlbum, getMusic }