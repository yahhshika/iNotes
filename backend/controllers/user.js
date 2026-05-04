const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ExpressError = require("../Utils/ExpressError");
const SECRET = "seougw9ur";


module.exports.signup = async(req,res,next)=>{
    let {email} = req.body.user;
    let user = await User.findOne({email:email});
    if(user){
        return next(new ExpressError(400,"user already exists"));
    }
    let {password} = req.body.user;
    let salt = await bcrypt.genSalt( 10);
    let hashedPass = await bcrypt.hash(password, salt)
    user = new User({...req.body.user, password:hashedPass});
    user = await user.save();
   
    let data ={
        user:user._id,
    }
    let token = jwt.sign(data, SECRET);
    res.cookie("token",token,{
        httpOnly: true,
        sameSite: "lax",
        secure: false
    });
    res.send({_id:user._id, name:user.name, email:user.email});
}

module.exports.login = async(req,res,next)=>{
    let {email, password} = req.body.user;
    let user = await User.findOne({email:email});
  
    if(!user){
        
        return next(new ExpressError(400, "Send Correct Credentials"));
    }
    let isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
        return next(new ExpressError(400,"Send Correct Credentials"));
    }
    let data = {
        user:user._id
    }
    let token = jwt.sign(data, SECRET);
    res.cookie("token",token,{
        httpOnly: true,
        sameSite: "lax",
        secure: false
    });
    res.send({_id:user._id, name:user.name, email:user.email});
}

module.exports.logout = (req,res,next)=>{
    try{
        console.log("inside logout");
        res.clearCookie("token",{
            httpOnly:true,
            sameSite:"lax",
            secure:false
        });
        res.send({message:"logout successfull !"});
    }catch(err){
        throw new ExpressError(500, "error in logout route");
    }
}