const express = require("express")
const route = express.Router()

const {
    CreateUser,
    VerifyOtp,
    Login
} = require("../controller/auth")

route.route("/create").post(CreateUser)
route.route("/verify").post(VerifyOtp)
route.route("/login").post(Login)

module.exports = route