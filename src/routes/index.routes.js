import express from "express"
import { route as userRoute } from "../model/users/user.routes.js"
import { route as repairsRoute } from "../model/repair/repairs.router.js"
import { protect } from "../model/users/user.middleware.js"

export const routes = express.Router()

routes.use("/users", userRoute)
routes.use(protect)
routes.use("/repairs", repairsRoute)