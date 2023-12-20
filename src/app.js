import express, { urlencoded } from "express"
import { AppError } from "./common/erros/appError.js"
import { globalErrorHandler } from "./common/erros/error.controller.js"
import { routes } from "./routes/index.routes.js"

const app = express()

app.use(express.json())
app.use(urlencoded({extended:true}))

//routes
app.use("/api/v1", routes)

app.all("*", (req, res, next) => {
  return next(new AppError(`this url is not defined ${req.originalUrl}`, 404))
})

app.use(globalErrorHandler)
export default app