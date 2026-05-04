export let onChangeHandler = (event, setNewNote)=>{
    try{

        setNewNote(prevNote=>{
            return {...prevNote, [event.target.name]:event.target.value}
        })
    }catch(err){
        console.log("error in newNoteController/onChangeHandler(fn): ");
        console.log(err);
    }
}
export let onSubmitHandler = async(event, addNote, setNewNote,setNotes,newNote,navigate)=>{
    try{

        event.preventDefault();
        if(!event.target.checkValidity()){
            event.stopPropagation()
        }
        event.target.classList.add('was-validated');
        if(!event.target.checkValidity()){return;}
        let response = await fetch(`${import.meta.env.VITE_BASE_URL}/notes/`, {
            method:"POST",
            body:JSON.stringify({
                note:{
                    title:newNote.title,
                    description:newNote.description,
                }
            }),
            headers:{
                "content-type":"application/json",
            },
            credentials:"include",
        });
        let responseJson = await response.json();
        console.log(responseJson);
        addNote(setNotes, responseJson);
        setNewNote({title:"", description:""});
        navigate("/");
    }catch(err){
        console.log("error in newNoteController/onSubmitHandler(fn): ");
        console.log(err);
    }

}