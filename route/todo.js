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
    RetrieveOne
} = require("../controller/todo")

/* adding required url endpoint, considering the parent endpoint*/
todoRoute.route("/fetch/all").get(RetrieveAll)
todoRoute.route("/add").post(CreateTodo)
todoRoute.route("/:id").patch(UpdateTodo).delete(DeleteTodo).get(RetrieveOne)
todoRoute.route("/all").delete(DeleteAllTodo)

module.exports = todoRoute