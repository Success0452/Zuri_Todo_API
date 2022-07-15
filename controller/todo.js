require("dotenv").config()
const Todo = require("../model/todo")
const User = require("../model/auth")
const mailer = require("../util/mailer")

/* function to create a new todo*/
const CreateTodo = async(req, res) => {

    const user = await User.findById(req.header._id)

    if (!user) {
        return res.status(400).json({
            msg: "user is not a registered member"
        })
    }

    const { title, description } = req.body

    /* if statement checks for empty parameter */
    if (!title && !description) {
        return res.status(400).json({
            msg: "title and description parameters must be provided"
        })
    }

    /* this accept the parameters and store them to create a new todo accordingly*/
    const create = await Todo.create({ title, description, createdBy: user._id })

    /*  checks whether the todo didn't encounter error while been created*/
    if (!create) {
        return res.status(400).json({
            msg: "unable to create todo"
        })
    }

    /* respond to the user the success message and the new todo created*/
    res.status(201).json({
        success: true,
        msg: "created successfully",
        todo: {
            _id: create._id,
            title: create.title,
            description: create.description,
            createdAt: create.createdAt,
            updatedAt: create.updatedAt
        }
    })
}

/* function to update a particular todo */
const UpdateTodo = async(req, res) => {

    const user = await User.findById(req.header._id)

    if (!user) {
        return res.status(400).json({
            msg: "user is not a registered member"
        })
    }

    /* reads the parameter from the url*/
    const { id } = req.params

    /* reads the parameter from the body */
    const { title, description } = req.body

    /* use the id provided to get a todo with that id from the database*/
    const todo = await Todo.findById(id)

    /* find the element with same id and update it with the new value been provided, which also return the current value if not provided*/
    const update = await Todo.updateOne({ _id: todo.id }, { title: title || todo.title }, { description: description || todo.description })

    /* checks if the item was updated successfully */
    if (!update) {
        return res.status(400).json({
            msg: "unable to update todo"
        })
    }

    /* respond to the user the success message */
    res.status(200).json({
        success: true,
        msg: "updated successfully"
    })

}

/* function to delete a particular todo */
const DeleteTodo = async(req, res) => {

    const user = await User.findById(req.header._id)

    if (!user) {
        return res.status(400).json({
            msg: "user is not a registered member"
        })
    }

    /* reads the parameter from the url */
    const { id } = req.params

    /* locate the item with the id provided and delete that item from the database*/
    await Todo.findByIdAndDelete(id)

    /* respond to the user the success message */
    res.status(200).json({
        success: true,
        msg: "todo deleted successfully"
    })
}

/* function to retrive a particular todo */
const RetrieveOne = async(req, res) => {

    const user = await User.findById(req.header._id)

    if (!user) {
        return res.status(400).json({
            msg: "user is not a registered member"
        })
    }

    /* reads the parameter from the url*/
    const { id } = req.params

    /* locate the item with the same id, and deselect the __v field from been returned with the result*/
    const todo = await Todo.findById(id).select("-__v")

    /* respond to the user the success message and the retrived todo created*/
    res.status(200).json({
        success: true,
        msg: "retrieved successfully",
        todo
    })
}

/* function to retrive all present todo*/
const RetrieveAll = async(req, res) => {

    const user = await User.findById(req.header._id)

    if (!user) {
        return res.status(400).json({
            msg: "user is not a registered member"
        })
    }

    /* gets all the user present in the database */
    const todo = await Todo.find()


    /* respond to the user the success message and the retrived todo created*/
    res.status(200).json({
        success: true,
        msg: "retrieved successfully",
        todo
    })
}

/* function to delete all present todo */
const DeleteAllTodo = async(req, res) => {

    const user = await User.findById(req.header._id)

    if (!user) {
        return res.status(400).json({
            msg: "user is not a registered member"
        })
    }

    /* get all the elements in the database and get them deleted*/
    await Todo.deleteMany()

    /* respond to the user the success message*/
    res.status(200).json({
        success: true,
        msg: "all todo deleted successfully"
    })
}

const NotifyUser = async(req, res) => {

    const users = await User.find()
    const toList = []
    for (let i = 0; i < users.length; i++) {
        if (users[i].verified === true) {
            toList.push(users[i].email)
        }
    }

    const subject = "Zuri Automated Generated Mail"

    const { message } = req.body

    if (!message) {
        return res.status(400).json({ msg: "message is required" })
    }
    mailer.sendMultiple(toList, subject, `<p> ${message} </p>`)

    res.status(200).json({
        msg: "email sent successfully",
        success: true
    })
}

/* all functions been exported to be accessed by the route*/
module.exports = {
    CreateTodo,
    UpdateTodo,
    DeleteTodo,
    RetrieveAll,
    DeleteAllTodo,
    RetrieveOne,
    NotifyUser
}