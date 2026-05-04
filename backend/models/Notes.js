const mongoose = require("mongoose");

const NotesSchema = new mongoose.Schema({
    title:String,
    description:{
        type:String
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
})

const Note = mongoose.model("Note",NotesSchema);
module.exports = Note;