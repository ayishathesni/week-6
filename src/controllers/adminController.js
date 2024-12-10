const User = require("../model/userModel")
const {passwordCompare,passwordHashed,passwordDecryt} = require("../utility/password")


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
   const {email,password} = req.body;
    const userData = await User.findOne({ email });

    if(userData.isAdmin){
      const passwordMatch = await passwordCompare(userData.password,password)

      if(!passwordMatch){
        return res.render("admin/login",{message:"Password is incorrect"})
      }
      req.session.adminId = userData._id
      return res.redirect("/admin/home")
    }else{
      return res.render("admin/login",{message:"Cannot access admin router"})
    }

  }catch (error) {
    console.log(error.message);
    res.render('admin/login', { message: "An error occurred. Please try again." });
  }
};


const loadhome=async(req,res)=>{
  try{
      const userData=await User.find()

      for(let i of userData){
       i.password = await passwordDecryt(i.password)
      }
      
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
    const hashedPass = await passwordHashed(password);

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
     const userData=await User.findById(id)
     userData.password = await passwordDecryt(userData.password)
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

    const hashedPass = await passwordHashed(password)

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
    const email = req.body.email 
    const user = await User.findOne({ email }); 

    console.log(user)

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