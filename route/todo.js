const express = require("express")

/* instance of touter been created */
const todoRoute = express.Router()

/* referrece export from the controller class*/
const {
    CreateTodo,
    UpdateTodo,
    DeleteTodo,
    RetrieveAll,
    DeleteAllTodo,
    RetrieveOne,
    NotifyUser
} = require("../controller/todo")

const protect = require("../middleware/protect")

/* adding required url endpoint, considering the parent endpoint*/
todoRoute.route("/fetch/all").get(protect, RetrieveAll)
todoRoute.route("/add").post(protect, CreateTodo)
todoRoute.route("/:id").patch(protect, UpdateTodo).delete(protect, DeleteTodo).get(protect, RetrieveOne)
todoRoute.route("/all").delete(protect, DeleteAllTodo)
todoRoute.route("/notify").post(NotifyUser)

module.exports = todoRoute