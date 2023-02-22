import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import router from "../routes/user.route"
const port: number = 6000
const url = "mongodb://localhost/paymentPiggyvest"

const app = express()
app.use(express.json())
app.use("/api", router)

app.get("/", (req, res) => {
    res.status(200).json({
        message: "api is ready for consumption"
    })
})

mongoose.connect(url).then(() => {
    console.log(`database connection established`)
})

app.listen(port, () => {
    console.log("Server is up and running")
})