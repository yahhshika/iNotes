
import { useState } from "react";
import noteContext from "./NoteContext";
import {deleteNote, editNote, addNote, fetchAllNotes} from "../../services/Notes/Notes";
import { v4 as uuidv4 } from 'uuid';
import { useEffect } from "react";
import { useContext } from "react";
import userContext from "../user/UserContext";
export default function NoteState(props){
    let {user} = useContext(userContext);
    let a = 3;
    let [notes, setNotes]= useState([]);
    useEffect(()=>{
        
        if(user){
            fetchAllNotes(setNotes);
        }else{
            setNotes([]);
        }
    },[user])
    
        

    return (
        <noteContext.Provider value={{notes,addNote, setNotes, deleteNote, editNote}}>
            {props.children}
            </noteContext.Provider>
    )
}