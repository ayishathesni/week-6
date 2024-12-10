const isLogin=async(req,res,next)=>{
    try{
      if(req.session.userId){
        
      }
      else{
        res.redirect('/admin')
      }
      next();
    }
    catch(error)
    {
      console.log(error)
    }
  } 
  
  const isLogout=async(req,res,next)=>{
    try{
      if(req.session.userid){
       res.redirect('/admin/home')
      }
      else{ 
      }
      next();
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