const express = require("express")
const router = express.Router();

const auth = require("../middleware/auth")
const controller = require("../controllers/userController")


router.get('/signup',auth.isLogout,controller.loadRegister)
router.post('/signup',controller.insertUser)
router.get('/',auth.isLogout,controller.loginLoad)
router.get('/login',auth.isLogout,controller.loginLoad)
router.post('/login',controller.verifyLogin)
router.post("/logout",controller.userLogout)
router.get('/home',auth.isLogin,controller.loadHome)


module.exports = router;