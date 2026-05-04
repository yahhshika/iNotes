const Note = require("../models/Notes");
const ExpressError = require("../Utils/ExpressError");

module.exports.getAllNotes = async(req,res,next)=>{
    let userId = req.user;
    let notes = await Note.find({owner:userId});
    res.send(notes);
}

module.exports.addNewNote = async(req,res,next)=>{
    let note = new Note(req.body.note);
    note.owner = req.user;
    let newNote = await note.save();
    res.send(newNote);
}

module.exports.editNote = async(req,res,next)=>{

    let {id} = req.params;
    let note = await Note.findById(id);
    if(!note){
        return next(new ExpressError(400, "no such note exists"));
    }
    let response = await Note.findByIdAndUpdate(id,req.body.note,{new:true, runValidators:true});
    res.send(response);
}

module.exports.deleteNote = async(req,res,next)=>{
    let {id} = req.params;
    let note = await Note.findById(id);
    if(!note){
        return next(new ExpressError(400,"no such note exists"));
    }
    let response = await Note.findByIdAndDelete(id);
    res.send(response);
}