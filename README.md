######
###Mongo CURD

This project focuses on carying out CRUD(create, retrieve, update, delete) operations using mongoDB, and it has been implemented neatly using the MVC (route, controller and model) pattern. the connection to mongoDB link was embedded into the .env file for security purpose, but the implementation of the connection was initiated in the db > connect.js file and called in the app.js file to complete the conncetion setup and make sure the connection occurs before the application start listening.

## Locally Available Routes

## Fetch all create todo
#### localhost:3000/todo/fetch/all

## Fetch one todo
#### localhost:3000/todo/:id

## Fetch one todo || Delete one todo || Update one todo
#### localhost:3000/todo/:id

## Delete all todo
#### localhost:3000/todo

#### Task Description: 
Create a Node.js server using any framework of choice (optional) and appropriate folder structure (routes, controllers, models, etc.) which will perform the following functions:

1. Add a Todo task to a Todo collection
2. Update a particular Todo task
3. Delete Todo task
4. Retrieve all Todo tasks (pagination optional