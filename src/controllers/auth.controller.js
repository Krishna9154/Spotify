const userModel = require("../models/user.models")
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')



async function registerUser(req, res) {
    const { username, email, password, role = 'user' } = req.body;

    const useralreadyexist = await userModel.findOne({
        $or: [
            { username },
            { email }
        ]
    })

    if (useralreadyexist) {
        return res.status(409).json({
            message: "User is already exist"
        })
    }

    const hash = await bcrypt.hash(password, 10)

    try {

        const user = await userModel.create({
            username,
            email,
            password: hash,
            role
        })

        //Token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
        res.cookie("token", token)

        return res.status(201).json({
            message: "user is created successfully",
            user: {
                username,
                email,
                role
            }
        })


    } catch (error) {
        console.log(error)

    }



}

module.exports = { registerUser }