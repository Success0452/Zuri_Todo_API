const mongoose = require("mongoose")

const Otp = new mongoose.Schema({
    id: {
        type: String
    },
    otp: {
        type: String
    },
    createdAt: {
        type: Date
    },
    expiresAt: {
        type: Date
    }
})

module.exports = mongoose.model("Otp", Otp)