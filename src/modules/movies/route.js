const { Router } = require("express")
const { create, getAll, update, deleted } = require("./movies")
const { verifyToken, verifyRole } = require("../../middlewares/authMiddleware")

const movieRouter =  Router()

movieRouter.get("/all", getAll)
movieRouter.post("/create", verifyToken, verifyRole("admin"), create)
movieRouter.patch("/update/:id", verifyToken, verifyRole("admin"), update)
movieRouter.delete("/delete/:id", verifyToken, verifyRole("admin"), deleted)

module.exports = movieRouter