import express from "express"
import cors from "cors"
import bodyParser from "body-parser"

const app = express()

// cors configuration
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}))

// set the middelwares for getting the data from the user in the multiple way
app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true , limit: "16kb"}))
app.use(express.static("dist"))
app.use(bodyParser.json())

// import the routes form routes
import { router } from "./routes/user.routes.js"
import {router as  productRouter } from "./routes/product.routes.js"

// declared the routes
app.use("/api/v1/users", router)
app.use("/api/v1/products", productRouter)



export { app }