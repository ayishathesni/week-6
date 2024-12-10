const express = require("express")
const app = express();
require("dotenv").config()
const nocache = require("nocache")
const path = require("path")
const defaultRouter = require("./routers/userRoute")
const adminRoute = require("./routers/adminRoute")
const connectDB = require("./config/db.config");
const session = require("express-session");
const PORT = process.env.PORT

app.set('view engine','ejs')
app.set('views',path.join(__dirname,"views"))

app.use(nocache())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(session({
    resave:false,
    secret:"3dxj34d8hrjdfZssd@gbjsl$fjs",
    saveUninitialized:false,
    cookie:{
        maxAge:1 * 60 * 1000,
        httpOnly:true,
        sameSite:"strict",
    }
}))




async function init() {
    await connectDB();

    app.use("/",defaultRouter);
    app.use('/admin',adminRoute)

    app.listen(PORT,()=>console.log("Server is running",PORT))
}

init();
