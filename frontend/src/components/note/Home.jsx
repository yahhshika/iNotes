import { useContext, useState } from "react"
import noteContext from "../../contexts/notes/NoteContext"
import Note from "./Note";
import EditNotes from "./EditNotes";
import userContext from "../../contexts/user/UserContext";
import Login from "../user/Login";
export default function Home(){
    let {notes} = useContext(noteContext);
    let [selectedNote, setSelectedNote] = useState(null);
    let {user}= useContext(userContext);
   
    return <>
    {user?
    <> <h4 className="my-5">Hey, {user.name}</h4>
    <div className="row row-cols-lg-3 row-cols-md-2 row-cols-sm-1 row-cols-1" >
        {notes.map(note=>(
            
            <Note note={note} key={note._id} key={note._id} setSelectedNote={setSelectedNote}></Note>
            
        ))}
        <EditNotes note={selectedNote}/> 
    </div></>: <> 
    <h3 className="col col-8 offset-2">you have to login/signup to access!</h3> 
    <Login/>
    </>
    }

    </>
}