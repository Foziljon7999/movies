let movieModel = require("./model");
let categoryModel = require("../categories/model");

const getAll = async (req, res) =>{
    try {
        const movies = await movieModel.find().populate("category", "name")
        res.json(movies)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

const create = async (req, res) => {
  let { name, category_id } = req.body;
  const category = await categoryModel.findOne({ _id: category_id });

  let movie = await movieModel.create({ name, category });
  await movie.save();

  res.send({
    success: true,
    data: movie,
  });
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
  const { name } = req.body;

  const movie = await movieModel.findByIdAndUpdate(
    id,
    { name },
    { new: true }
  );
  if (!movie) {
    return res.status(404).send({
      success: false,
      message: "Film not found",
    });
  }
  res.send({
    success: true,
    data: movie
  })
  } catch (error) {
    res.status(500).send({
        success: false,
        message: error.message
    })
  }
};

const deleted = async (req, res) => {
    try {
        const { id } = req.params
        const movie = await movieModel.findByIdAndDelete(id)
        if(!movie){
            return res.status(404).send("Film not found")
        }
        res.send({
            success: true,
            message: "Deleted"
        })
    } catch (error) {
        res.status(500).send({
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
};
