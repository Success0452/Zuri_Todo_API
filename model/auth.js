const bcrypt = require("bcryptjs")
const mongoose = require("mongoose")

const User = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "email is required"],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please provide a valid email',
        ]
    },
    fullname: {
        type: String,
        required: [true, "fullname is required"]
    },
    password: {
        type: String,
        required: [true, "fullname is required"]
    },
    verified: {
        type: Boolean,
        default: false
    }
})

User.pre("save", async function(next) {
    if (!this.isModified('password')) {
        next()
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

User.methods.Compare = async function(password) {
    return bcrypt.compare(password, this.password)
}

module.exports = mongoose.model("User", User)