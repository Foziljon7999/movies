const User = require("./model")
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
dotenv.config()

const register = async (req, res) => {
    try {
        const { username, password, role } = req.body

        const user = new User({username, password, role})
        await user.save()

        res.send({
            success: true,
            message: "Successfully registered"
        })
    } catch (error) {
        res.status(403).send({
            success: false,
            message: error.message
        })
    }
}

const login = async (req, res) => {
    try {
        const { username, password } = req.body
        const user = await User.findOne({username})

        if(!user){
            return res.status(403).send("Login or password wrong")
        }

        const token = jwt.sign({userId: user._id, role: user.role}, process.env.SECRET_KEY, { expiresIn: "1d"})
        res.json({ token })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        })
    }
}

module.exports = {
    register,
    login
}