const mongoose = require("mongoose")

 const connectDB = async()=>{
    try {
        await mongoose.connect("mongodb://localhost:27017/school")
        console.log("Database connected")
    } catch (error) {
        console.log(error.message)
        console.error(error)
    }
}

module.exports = connectDB  