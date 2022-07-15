require("dotenv").config()
const jwt = require("jsonwebtoken")
const User = require("../model/auth")

const protect = async(req, res, next) => {
    try {
        let token;
        const authToken = req.headers.authorization

        if (!authToken || !authToken.startsWith("Bearer ")) {
            return res.status(401).json({ msg: "invalid token format" })
        }

        token = authToken.split(' ')[1]
        if (!token) {
            return res.status(401).json({ msg: "unable to retrieve user" })
        }
        const decode = jwt.verify(token, process.env.JWT_SECRET)
        req.header = await User.findById(decode.id).select("-password")
        next()
    } catch (e) {
        return res.status(500).json({ msg: e.message })
    }
}

module.exports = protect