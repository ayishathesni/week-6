const isLogin=async(req,res,next)=>{
    try{
      if(req.session.adminId){
       return next(); 
      }
      else{
      return  res.redirect('/admin')
      }
      
    }
    catch(error)
    {
      console.log(error)
    }
  } 
  
  const isLogout=async(req,res,next)=>{
    try{
      if(req.session.adminId){
       return res.redirect('/admin/home')
      }
      else{ 
        return next();
      }
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