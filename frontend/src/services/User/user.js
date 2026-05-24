
export let onSubmitHandlerSignUp = async(event, setUser, credentials,  setCredentials, navigate)=>{
    try{

        event.preventDefault();
        if(!event.target.checkValidity()){
            event.stopPropagation();
        }
        event.target.classList.add('was-validated');
        if(!event.target.checkValidity()){return;}
        let res = await fetch(`${import.meta.env.VITE_BASE_URL}/auth/signup`,{
            body: JSON.stringify({
                user: credentials
            }),
            headers:{
                "content-type":"application/json"
            },
            method:"post",
            credentials:"include"
        });
        let resJson = await res.json();
        // console.log(resJson)
        if(resJson.errors){
            setUser(null);
        }else{

            setUser(resJson);
        }
        setCredentials({name:"", email:"", password:""});
        navigate("/");
    }catch(err){
        console.log("error in user/onSubmitHandlerSignUp(fn):");
        console.log(err);
    }
};

export let logOut = async(setUser)=>{
    try{

        let res = await fetch(`${import.meta.env.VITE_BASE_URL}/auth/logout`,{
            method:"get",
            credentials:"include"
        });
        let resJson = await res.json();
        console.log(resJson);
        setUser(null);
    }catch(err){
        console.log("error in user/logOut(fn):");
        console.log(err);
    }
    
};

export let onSubmitHandlerLogin = async(event, setUser, credentials, setCredentials, navigate)=>{
    try{

        event.preventDefault();
        if(!event.target.checkValidity()){
            event.stopPropagation();
        }
        event.target.classList.add('was-validated');
        if(!event.target.checkValidity()){return;}
        let res = await fetch(`${import.meta.env.VITE_BASE_URL}/auth/login`,{
            body: JSON.stringify({
                user: credentials
            }),
            headers:{
                "content-type":"application/json"
            },
            method:"post",
            credentials:"include"
        });
        let resJson = await res.json();
        // console.log(resJson)
        if(resJson?.errors){
            setUser(null);
        }else{
            setUser(resJson);
        }
        setCredentials({name:"", email:"", password:""});
        navigate("/");
    }catch(err){
        console.log("error in user/onSubmitHandlerLogin(fn)");
        console.log(err);
    }
}

export let authenticate = async(setUser)=>{
    try{

        let res = await fetch(`${import.meta.env.VITE_BASE_URL}/auth/authenticate`,{
            method:"get",
            credentials:"include",
        });
        let resJson = await res.json();
        if(resJson?.errors){
            setUser(null);
        }else{

            setUser(resJson);
        }

    }catch(err){
        console.log("error in authentication: ");
        console.log(err)
    }
}