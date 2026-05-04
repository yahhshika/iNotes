const express = require("express")
const router = express.Router();
const User = require("../models/User");
const userController = require("../controllers/user");
const ExpressError = require("../Utils/ExpressError");
const asyncWrap = require("../Utils/asyncWrap")
const {authenticate, validateUserSchemaViaJoi, validateUserSchemaViaJoiLogin} = require("../middlewares");

router.get("/",(req,res)=>{
    res.send("app is working");
});

router.post("/signup",validateUserSchemaViaJoi,asyncWrap( userController.signup));

router.post("/login",validateUserSchemaViaJoiLogin,asyncWrap(userController.login));


router.get("/authenticate",authenticate,async(req,res,next)=>{
    let id = req.user;
    let user = await User.findById(id).select("-password");
    if(!user){
        return next(new ExpressError(400, "Login/Signup again with correct credentials to get access"));
    }
    res.send({_id:user._id, name: user.name, email:user.email});
})
router.get("/logout",authenticate,userController.logout)
module.exports = router;