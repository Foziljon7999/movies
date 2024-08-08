const {model, Schema, Types } = require("mongoose")

const categorySchema = new Schema({
    id: {
        type: Types.ObjectId,
    },
    name: {
        type: String,
        required: true
    },
    movies: [
        {
          type: Types.ObjectId,
          ref: "Movie"
    }
]
}, {
    collection: "categories"
})

module.exports = model('Category', categorySchema)