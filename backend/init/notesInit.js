let notes = require("./notes");
const Note = require("../models/Notes");
const dbConnect = require("../dbConnect");


async function initNotes(){
    // 69df7b0d1b8f6d3d14c85e34
    notes = notes.map(note=>{
        return {...note,owner:"69e637601bc4090e9f62e23b"}
    })
  
    await Note.deleteMany({});
    await Note.insertMany(notes);
}
dbConnect();
initNotes().then(()=>{
    console.log("Notes db init successful");
}).catch(err=>{
    console.log("error in initializing the db for notes: "+err);
})