export async function deleteNote(setNotes, _id){
    try{

        let response = await fetch(`${import.meta.env.VITE_BASE_URL}/notes/${_id}`,{
            method:"DELETE",
            credentials:"include"
        })
        let responseJson =await response.json();
        console.log(responseJson);
        setNotes(prevNotes=>{
            return prevNotes.filter(note=>note._id!=_id);
        })
    }catch(err){
        console.log("error in Notes/deleteNote(fn): ");
        console.log(err);
    }
}
export function editNote(setNotes, id, newContent){
    try{

        setNotes(prevNotes=>{
            return prevNotes.map(note=>{
                if(note._id !== id){
                    return note;
                }
                return {...note, ...newContent};
            })
        })
    }catch(err){
        console.log("error in Notes/editNote(fn): ")
        console.log(err);
    }
}
export function addNote(setNotes, newNote){
    try{
        
        setNotes(prevNotes=>{
            return [...prevNotes,newNote]
        })
    }catch(err){
        console.log("error in Notes/addNote: ");
        console.log(err);
    }
}
export async function fetchAllNotes(setNotes){
    try{

        let response = await fetch(`${import.meta.env.VITE_BASE_URL}/notes/`, {
            method:"get",
            credentials:'include'
        });
        let resJson = await response.json();
        if(Array.isArray(resJson)){
    
            setNotes(resJson);
        }else{
            setNotes([]);
        }
    }catch(err){
        console.log("error in fetching all notes:");
        console.log(err);
    }
};