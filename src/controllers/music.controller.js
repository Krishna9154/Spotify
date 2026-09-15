const musicModel= require('../models/music.model')
const jwt = require("jsonwebtoken")
const uriGenerator= require('../service/imageKit.service')


async function uploadMusic(req,res){

    const token = req.cookies.token

    if(!token){
        return res.status(401).json({
            message:"Unauthorized User"
        })
    }

    try {

        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        
        if(decoded.role!=='artist'){
            return res.status(403).json({
                message:"you don't have permission to create a music"
            })
        }

        const result = await uriGenerator(req.file.buffer,req.file.originalname)
        
        // console.log(result.url)
        const {title}=req.body
        const music = await musicModel.create({
            uri:result.url,
            title,
            artist:decoded.id,
        })

        return res.status(201).json({
            message:"Music is created",
            music:{
                id:music._id,
                uri:music.uri,
                title:music.title,
                artist:music.artist

            }
        })

    } catch (error) {
        return res.status(401).json({
            message:"Unauthorized User"
        }) 
        
    }

}


module.exports = {uploadMusic}