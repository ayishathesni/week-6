const mongoose=require("mongoose")

const userSchema=mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false }
})
const User = mongoose.model('newUser', userSchema);


module.exports = User;