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

async function loginUser(req, res) {

    const { username, email, password } = req.body;

    const User = await userModel.findOne({
        $or: [
            { username },
            { email }
        ]
    })
    

    if (!User) {
        return res.status(401).json({
            message: 'Invalid Credencials'
        })
    }

    const isPasswordValid = await bcrypt.compare(password, User.password)

    if (!isPasswordValid) {
        return res.status(401).json({
            message: 'Invalid Credencials'
        })

    }

    const token = jwt.sign(
        {
        id:User._id,
        role:User.role
        },
        process.env.JWT_SECRET)

    res.cookie('token',token)

    return res.status(200).json({
        message:"User is Login Successfully",
        User:{
            username:User.username,
            email:User.email,
            role:User.role

        }
    })



}

module.exports = { registerUser, loginUser }