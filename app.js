require("dotenv").config()
const express = require("express")
const app = express()


const connectDB = require("./db/connect")

const todoRoute = require("./route/todo")

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.use("/api/v1/todo", todoRoute)


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