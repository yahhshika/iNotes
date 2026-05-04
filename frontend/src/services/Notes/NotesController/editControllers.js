export let onChangeHandlerEditNotes = (event, setCurrValues)=>{
    try{

        setCurrValues(prevValues=>{
            return {...prevValues, [event.target.name]:event.target.value}
        })
    }catch(err){
        console.log("error in editControllers/onChangeHandlerEditNotes(fn): ");
        console.log(err);
    }
}
export let onSubmitHandlerEditNotes = async(event,editNote, ref1,setNotes,note,_id,currValues)=>{
    try{
        
        event.preventDefault();
        if(!event.target.checkValidity()){
            event.stopPropagation()
        }
        event.target.classList.add('was-validated');
        if(!event.target.checkValidity()){return;}
    
        let response = await fetch(`http://localhost:5000/notes/${_id}`,{
            method:"PUT",
            headers:{
                "content-type":"application/json",
            },
            body: JSON.stringify({
                note:currValues
            }),
            credentials:"include"
        })
        let responseJson = await response.json();
        console.log(responseJson);
        editNote(setNotes, note._id || null, responseJson);
        ref1.current.click();
    }catch(err){
        console.log("err in editControllers/onSubmitHandlerEditNotes(fn): ");
        console.log(err);
    }
}