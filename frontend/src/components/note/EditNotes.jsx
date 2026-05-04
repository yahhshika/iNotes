import { useEffect, useRef, useState } from "react"
import { v4 as uuidv4 } from 'uuid';
import { useContext } from "react";
import noteContext from "../../contexts/notes/NoteContext";
import { onChangeHandlerEditNotes, onSubmitHandlerEditNotes } from "../../services/Notes/NotesController/editControllers";
export default function EditNotes({note}){
    let ref1 = useRef()
    let {editNote, setNotes} = useContext(noteContext);
    let [currValues, setCurrValues] = useState({ title:note?.title || "", description: note?.description || "" });

    useEffect(()=>{
        if(note){
            setCurrValues(prev=>({...prev, title:note.title, description:note.description}))
        }
    }, [note]);

    return <>
    <div className="modal navbar-attached fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" data-bs-backdrop="static">
        <div className="modal-dialog ">
            <div className="modal-content bg-blueish">
            <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">Edit</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" ref={ref1}></button>
            </div>
            <div className="modal-body">
                <form action="" onSubmit={(event)=>{onSubmitHandlerEditNotes(event,editNote,ref1,setNotes,note,note._id,currValues)}} className="needs-validation" noValidate>
                    <input type="text" value={currValues.title} className="form-control" name="title" onChange={(event)=>{onChangeHandlerEditNotes(event, setCurrValues)}} required/> <br /> 
                    <textarea name="description" id="" value={currValues.description} className="form-control" onChange={(event)=>{onChangeHandlerEditNotes(event, setCurrValues)}} required></textarea>
                    <br />
                    <button type="submit" className="btn btn-primary">Submit</button> 
                </form>
            </div>
     
            </div>
        </div>
    </div>
        
    </>
}