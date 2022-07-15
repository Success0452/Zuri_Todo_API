const mongoose = require("mongoose")

const Otp = new mongoose.Schema({
    id: {
        type: String
    },
    otp: {
        type: String
    },
    createdAt: {
        type: String
    },
    expiresAt: {
        type: String
    }
})

module.exports = mongoose.model("Otp", Otp)