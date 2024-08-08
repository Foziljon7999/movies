const mongoose  = require("mongoose")

const mongo = async () =>{
return await mongoose.connect("mongodb://localhost:27017/movies")
}

module.exports = mongo