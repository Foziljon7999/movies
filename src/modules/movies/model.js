const {model, Schema, Types } = require("mongoose")

const movieSchema = new Schema({
    id: {
        type: Types.ObjectId,
    },
    name: {
        type: String,
        required: true
    },
    category: {
        type: Types.ObjectId,
        ref: "Category"
    }
}, {
    collection: "movies"
})

module.exports = model('Movies', movieSchema)