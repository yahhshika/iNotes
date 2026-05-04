import { useState } from "react";
import { useContext } from "react";
import noteContext from "../../contexts/notes/NoteContext";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import { onChangeHandler,onSubmitHandler} from "../../services/Notes/NotesController/newNoteController";
import userContext from "../../contexts/user/UserContext";
import Login from "../user/Login";
export default function NewNoteForm(){
    let {user}= useContext(userContext)
    let navigate = useNavigate();
    let {setNotes, addNote} = useContext(noteContext)
    let [newNote, setNewNote] = useState(()=>({title:"", description:""}))

    return <>
    {user?
    <form action="" className="col col-6 offset-3 mt-5 needs-validation" onSubmit={()=>{onSubmitHandler(event, addNote, setNewNote,setNotes,newNote,navigate)}} noValidate>
        <h1 className="my-5">Add a New Note</h1>
        <label htmlFor="title">Title</label>
        <input type="text" name="title" value={newNote.title} className="form-control" id="title" onChange={(event)=>{onChangeHandler(event,setNewNote)}} required/>
        
        <label htmlFor="description">Description</label>
        <textarea name="description" id="description" value={newNote.description} className="form-control" onChange={(event)=>{onChangeHandler(event,setNewNote)}} required rows={10}></textarea>
        <br /><br />
        <button className="btn btn-primary" type="submit">submit</button>
    </form>: <> 
        <h3 className="col col-8 offset-2">you have to login/signup to access!</h3> 
        <Login/>
    </>}
    
    </>
}