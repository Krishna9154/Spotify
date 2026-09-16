const jwt = require('jsonwebtoken')




async function authArtist(req, res, next) {

    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({
            message: "Unauthrized User"
        })
    }

    try {

        const decoded =  jwt.verify(token, process.env.JWT_SECRET)
        if (decoded.role !== 'artist') {
            return res.status(402).json({
                message: "You dont have access to create album"
            })
        }

        req.user = decoded
        next()


    } catch (error) {

        return res.status(401).json({
            message: "Unauthrized User"
        })

    }

    

}

module.exports = { authArtist }