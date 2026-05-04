import "./Note.css"
import EditNotes from "./EditNotes"
import { useContext, useState } from "react"
import noteContext from "../../contexts/notes/NoteContext"

export default function Note({note, setSelectedNote}){
    let {deleteNote, setNotes} = useContext(noteContext);
    return<>
        <div className="card col border-none mb-3" style={{backgroundColor:"transparent"}}>
            <div className="card-body rounded-border d-flex flex-column glasmorphism">
                <h5 className="card-title" >Title: {note.title}</h5>
            
                <p className="card-text flex-1" >Content: {note.description}</p>

                <div className="card-text">

                    <button type="button" className="btn" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={()=>{setSelectedNote(note)}} style={{color:"white"}}>
                        <i class="fa-solid fa-pen-to-square"></i>
                    </button>  
                    <button type="button" className="btn" style={{color:"white"}}>
                    <i className="fa-solid fa-delete-left" onClick={()=>{deleteNote(setNotes, note._id)}}></i>
                    </button>  
                </div>
           
            </div>
        </div>
    </>
}