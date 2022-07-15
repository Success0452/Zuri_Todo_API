require("dotenv").config()
const express = require("express")
const app = express()


const connectDB = require("./db/connect")

const todoRoute = require("./route/todo")
const authRoute = require("./route/auth")

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.use("/api/v1/todo", todoRoute)
app.use("/api/v1/auth", authRoute)

const port = process.env.PORT || 3000

const start = async() => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`Server is listeing at port ${port}`))
    } catch (e) {
        console.log(`${e.message}`)
    }
}

start()