const router = require("express").Router();


const auth=require('../middleware/adminAuth')
const controller = require("../controllers/adminController")

router.get('/',auth.isLogout,controller.loadlogin)

router.post('/',controller.verifylogin)

router.get('/home',auth.isLogin,controller.loadhome)

router.get('/newuser',auth.isLogin,controller.newUserLoad)
router.post('/newuser',controller.addUser)

router.get('/edituser',auth.isLogin,controller.edituserLoad)
router.post('/edituser',controller.updateUsers)

router.get('/deletuser',controller.deleteUser)
router.post('/userdetail',controller.showUser)


router.get('*',function(req,res){
  res.redirect('/admin')
})


module.exports=router