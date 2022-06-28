require("dotenv").config()
const Todo = require("../model/todo")


/* function to create a new todo*/
const CreateTodo = async(req, res) => {
    const { title, description } = req.body

    /* if statement checks for empty parameter */
    if (!title && !description) {
        return res.status(400).json({
            msg: "title and description parameters must be provided"
        })
    }

    /* this accept the parameters and store them to create a new todo accordingly*/
    const create = await Todo.create({ title, description })

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

    /* get all the elements in the database and get them deleted*/
    await Todo.deleteMany()

    /* respond to the user the success message*/
    res.status(200).json({
        success: true,
        msg: "all todo deleted successfully"
    })
}

/* all functions been exported to be accessed by the route*/
module.exports = {
    CreateTodo,
    UpdateTodo,
    DeleteTodo,
    RetrieveAll,
    DeleteAllTodo,
    RetrieveOne
}