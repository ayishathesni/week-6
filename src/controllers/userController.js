const User = require("../model/userModel")
const { passwordHash,passwordCompare } = require('../utility/password');


const loadRegister=async(req,res)=>{
  try{
           res.render('user/signup')
        }
        catch(error){
            console.log(error.message)
        }
    }
    
    const insertUser = async (req, res) => {
        const {email,password,admin} = req.body;
        try {

            const emailIsExsits = await User.findOne({email});

            if(emailIsExsits){
              return res.render("user/signup",{message:"User already exists"})
            }
 
            const hashedPass = await passwordHash(password);
            const isAdmin = admin ? 1 : 0;
            
            const user = new User({
                email,
                isAdmin,
                password: hashedPass,
            });
            
            await user.save();
        
            return res.redirect("/login")
        
  } catch (error) {
      console.error(error);
      res.render('user/signup', { message: "An unexpected error occurred. Please try again." });
  }
};


////login
const loginLoad=async(req,res)=>{
  try{
    res.render('user/login')
  }
  catch(error)
  {
    console.log(error)
  }
}

const verifyLogin = async (req, res) => {
  try {
    const {email,password} = req.body;
   
    
    console.log("Login attempt for user:", email); 
    
    const userData = await User.findOne({ email });
    
    if (userData) {
      const passwordMatch = await passwordCompare(userData.password,password)
      if (passwordMatch) {
        req.session.user = userData.email
        return res.redirect('/home');
        // return res.json({message:"user login success"})
      } else {
        res.render('user/login', { message: 'Password is incorrect' });
      }
    } else {
      res.render('user/login', { message: 'Username is incorrect.' });
    }
  } catch (error) {
    console.log(error); // Corrected log statement
  }
}

const loadHome=(req,res)=>
{
  try{
        res.render('user/home')
  }
  catch{
     console.log(error.message)
  }
}

const userLogout = (req,res)=>{
  req.session.destroy((err) => {
    res.clearCookie("connect.sid");
    if (err) return res.redirect("/home");
    res.redirect("/login");
  });
}

module.exports={
  loadRegister,
  insertUser,
  loginLoad,
  verifyLogin,
  loadHome,
  userLogout
}