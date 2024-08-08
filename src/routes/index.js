const {Router} = require("express")
const categoryRouter = require("../modules/categories/route")
const movieRouter = require("../modules/movies/route")
const usersRouter = require("../modules/users/route")
const authRouter = require("../modules/auth/route")

const router = Router()

router.use("/categories", categoryRouter)
router.use("/movies", movieRouter)
router.use("/", authRouter)
router.use("/users", usersRouter)


module.exports = router