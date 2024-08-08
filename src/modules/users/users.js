const User = require("./model")

const getAllUsers = async (req, res) =>{
    try {
        const users = await User.find()
        res.send(users)
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        })
    }
}

const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if(!user){
            return res.status(404).send("User not found")
        }
        res.send({
            success: true,
            data: user
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        })
    }
}

module.exports = {
    getAllUsers,
    getUserById
}