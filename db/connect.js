const mongoose = require("mongoose")

/* function to create a connection to mongoDB with the provided URL*/
const connectDB = async(url) => {
    return mongoose.connect(url)
}

/* function been exported to be accessed by the route*/
module.exports = connectDB