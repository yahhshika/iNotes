const ExpressError = require("./Utils/ExpressError");
const jwt = require("jsonwebtoken");
const SECRET = "seougw9ur";
const {userJoiSchema, userJoiSchemaforLogin, newNoteJoiSchema, editNoteJoiSchema}= require("./Utils/joiSchema");
const Note = require("./models/Notes");
module.exports.authenticate = (req,res,next)=>{
    console.log("via authenticate=> req.cookies: ");
    console.log(JSON.stringify(req.cookies));
    let token = req.cookies.token;
    if(!token){
        return next(new ExpressError(401, "Something went wrong! Kindly Login/SignUp with correct credentials to get access."));
    }
    let data = jwt.verify(token, SECRET);
    req.user = data.user;
    next();

}

module.exports.validateUserSchemaViaJoi = (req,res,next)=>{
    let result = userJoiSchema.validate(req.body);
    if(result.error){
        let errMsg = result.error.details.map(e=>e.message).join(", ");
        return next(new ExpressError(400,errMsg));
    }
    next();
}
module.exports.validateUserSchemaViaJoiLogin = (req,res,next)=>{
    let result = userJoiSchemaforLogin.validate(req.body);
    if(result.error){
        let errMsg = result.error.details.map(e=>e.message).join(", ");
        return next(new ExpressError(400,errMsg));
    }
    next();
}
module.exports.validateNewNotesSchema = (req,res,next)=>{
    let result = newNoteJoiSchema.validate(req.body);
    if(result.error){
        let errMsg = result.error.details.map(e=>e.message).join(", ");
        return next(new ExpressError(400,errMsg));
    }
    next();
}
module.exports.validateEditNotesSchema = (req,res,next)=>{
    let result = editNoteJoiSchema.validate(req.body);
    if(result.error){
        let errMsg = result.error.details.map(e=>e.message).join(", ");
        return next(new ExpressError(400,errMsg));
    }
    next();
}

module.exports.isNoteOwner = async(req,res,next)=>{
    let loggedInUserId = req.user;
    let noteId = req.params.id;
    let note = await Note.findById(noteId);
    if(!note){
        return next(new ExpressError(400,"no such note exist"));
    }
    if(loggedInUserId.toString() !== note.owner.toString()){
        return next(new ExpressError(401,"You are not the owner of this note"));
    }
    next();
}