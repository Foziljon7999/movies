const categoryModel = require("./model")

const getAll = async(req, res) => {
    try {
        let categories = await categoryModel.find()
    res.send({
        success: true,
        data: categories
    })
    } catch (error) {
        res.status(error.status || 500).send({
            success: false,
            message: error.message
        })
    }
}

const create = async (req, res) => {
    try {
        let { name } = req.body
    let category = await categoryModel.create({name})
    category.save()
    res.send({
        success: true,
        data: category
    })
    } catch (error) {
        res.status(403).send({
            success: false,
        message: error.message
        })
    }
}

const update = async (req, res) => {
    const { name } = req.body
    const { id } = req.params

    const category = await categoryModel.findById(id)
    if(category){
    let result = await categoryModel.findOneAndUpdate({_id: id}, {name}, {new: true, upsert: true})
    res.send({
        success: true,
        data: result
    })
    } else {
        res.status(404).send({
            success: false,
            message: "There is no such id category"
        })
    }
}

const deleted = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await categoryModel.findByIdAndDelete(id)
        if(!category){
            return res.status(404).send("Category not found")
        }
        res.send({
            success: true,
            message: "Deleted"
        })
    } catch (error) {
        res.status(403).send({
            success: false,
            message: error.message
        })
    }
}

module.exports = {
    getAll,
    create,
    update,
    deleted
}