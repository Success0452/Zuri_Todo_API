######
### Nodemailer Implementation


This project focuses on sending automated email with nodemailer, and this was implemented in this project by sending otp to verify account through email on account creation of a new account in order to confirm the owner of the email, and also implemented sending a customize bulk email to all the verified user in the system.

The project also involves CRUD(create, retrieve, update, delete) operations using mongoDB, and it has been implemented neatly using the MVC (route, controller and model) pattern. the connection to mongoDB link was embedded into the .env file for security purpose, but the implementation of the connection was initiated in the db > connect.js file and called in the app.js file to complete the conncetion setup and make sure the connection occurs before the application start listening.



## Locally Available Routes

## create new account
#### localhost:3000/auth/create

## verify account
#### localhost:3000/auth/verify

## login account
#### localhost:3000/auth/login

## notify user
#### localhost:3000/todo/notify

## Fetch all create todo
#### localhost:3000/todo/fetch/all

## Fetch one todo
#### localhost:3000/todo/:id

## Fetch one todo || Delete one todo || Update one todo
#### localhost:3000/todo/:id

## Delete all todo
#### localhost:3000/todo

#### Task Description: 
Create a new NodeJs app or use one you already have to send an automated email to a Gmail account.

You are to use "Nodemailer" (the email sender package in NodeJs). So you will install it within your project and then send a mail to your Google mail account.

You can try bulk messaging (optional)


![1657926165636](https://user-images.githubusercontent.com/52849344/179322533-e435e249-82f9-445b-951f-300e6faa959d.jpg){:class="img-responsive"}
![1657926165656](https://user-images.githubusercontent.com/52849344/179322539-cbcde669-6032-4988-b0a2-13dbe51b806a.jpg){:class="img-responsive"}
