const User = require("../model/userModel")
const {passwordCompare,passwordHash} = require("../utility/password")


const loadlogin=async(req,res)=>{
  try{
    res.render('admin/login')
  }
  catch(error){
    console.log(error.message)
  }
}


const verifylogin = async (req, res) => {
  try {
    const userName = req.body.username;
    const password = req.body.password;
    const userData = await User.findOne({ userName: userName });

    if (userData) {
      const passwordMatch = await passwordCompare(userData.pas
          res.redirect('/admin/home');
        } else {
          res.render('admin/login', { message: "You do not have admin access." });
        }
      } else {
        res.render('admin/login', { message: "Email and password are incorrect." });
      }
    } else {
      res.render('admin/login', { message: "Email and password are incorrect." });
    }
  } catch (error) {
    console.log(error.message);
    res.render('admin/login', { message: "An error occurred. Please try again." });
  }
};


const loadhome=async(req,res)=>{
  try{
      const userData=await User.find()
      res.render('admin/home',{users:userData})
  }
  catch(error){
    console.log(error)
  }
}



const newUserLoad=async(req,res)=>{
  try{
      res.render('admin/newuser')
  }
  catch(error){
    console.log(error)
  }
}


const addUser = async (req, res) => {
  try {
    const {email,password} = req.body;
    const hashedPass = await passwordHash(password);

    const user = new User({
      email,
      password: hashedPass
    });

    const userData = await user.save();
    if (userData) {
      res.redirect('/admin/home');
    } else {
      res.render('admin/newuser', { message: "Something went wrong" });
    }
  } catch (error) {
    if (error.code === 11000) {
      // Handle duplicate key error (username or email already exists)
      res.render('admin/newuser', {
        message: "Username or email already exists. Please use a different one."
      });
    } else {
      console.log(error);
      res.render('admin/newuser', { message: "An error occurred. Please try again." });
    }
  }
};


const edituserLoad=async(req,res)=>{
  try{
     const id=req.query.id;
     const userData=await User.findById({id})
     if(userData){
      res.render('admin/edituser',{user:userData})
     }
  }
  catch(error){
    console.log(error)
  }
}

const updateUsers=async(req,res)=>{
  try{
    const {id,email,password} = req.body;
   

    if(!id || !email || !password){
      return res.render("admin/edituser",{message:"All fields is required"})
    }

    const hashedPass = await passwordHash(password)

    const payload = {
      email,
      password:hashedPass
    }

     const userData=await User.findByIdAndUpdate(id,payload,{new:true})
     
     if(!userData){
      return res.render("admin/edituser",{message:"User not found"})
     }
     
     res.redirect('/admin/home')

  }
  catch(error){
    console.log(error)
  }
}

const showUser = async (req, res) => {
  try {
    const name = req.body.userName; 
    const user = await User.findOne({ userName: name }); 

    if (user) {
      res.render('admin/userdetail', { user, message: null });
    } else {
      res.render('admin/userdetail', { user: null, message: 'User not found' });
    }
  } catch (error) {
    console.log(error);
    res.render('admin/userdetail', { user: null, message: 'An error occurred' });
  }
};


const deleteUser = async (req, res) => {
  try {
    const Id = req.query.id; 
     await User.deleteOne({_id:Id})
    res.redirect('/admin/home')

    
  } catch (error) {
    console.log(error);
    res.render('admin/userdetail', { message: 'An error occurred' });
  }
};










module.exports={
  loadlogin,
  verifylogin,
  loadhome,
  newUserLoad,
  addUser,
  edituserLoad,
  updateUsers,
  deleteUser,
  showUser
  
}