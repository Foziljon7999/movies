const {Router} = require("express")
const { create, getAll, update, deleted } = require("./categories")
const { verifyToken, verifyRole } = require("../../middlewares/authMiddleware")

const categoryRouter = Router()

categoryRouter.get("/all", getAll)
categoryRouter.post("/create", verifyToken, verifyRole("admin"), create)
categoryRouter.patch("/update/:id", verifyToken, verifyRole("admin"), update)
categoryRouter.delete("/delete/:id", verifyToken, verifyRole("admin"), deleted)


module.exports = categoryRouter