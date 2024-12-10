const isLogin=async(req,res,next)=>{
  try{
    if(req.session.user){
      return next();
    } 
    else{
     return res.redirect('/')
    }
  }
  catch(error)
  {
    console.log(error)
  }
}

const isLogout=async(req,res,next)=>{
  try{
    if(req.session.user){
     return res.redirect('/home')
    }
    return next();
  }
  catch(error)
  {
    console.log(error)
  }
}
module.exports={
  isLogin,
  isLogout,
}