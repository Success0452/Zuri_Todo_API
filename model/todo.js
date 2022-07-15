const mongoose = require("mongoose")

const TodoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "title is required"],
        trim: true
    },
    description: {
        type: String,
        required: [true, "description is required"],
        trim: true
    },
    createdBy: {
        type: String,
        required: [true, "createdBy is required"],
    }

}, { timestamps: true })

module.exports = mongoose.model("Todo", TodoSchema)