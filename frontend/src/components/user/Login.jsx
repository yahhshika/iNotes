import { useState, useContext } from "react"
import { onSubmitHandlerLogin } from "../../services/User/user";
import userContext from "../../contexts/user/UserContext";
import { useNavigate } from "react-router-dom";
export default function Login(){
    let {setUser} = useContext(userContext);
    let navigate = useNavigate();
    let [credentials, setCredentials] = useState({email:"", password:""});
    let onChangeHandler = (event)=>{
        setCredentials(prev=>{
            return {...prev, [event.target.name]:event.target.value};
        })
    }
    // let onSubmitHandler = (event)=>{
    //     event.preventDefault();
    //     if(!event.target.checkValidity()){
    //         event.stopPropagation();
    //     }
    //     event.target.classList.add('was-validated');
    //     if(!event.target.checkValidity()){return;}
    //     console.log("submitted");
    // }
    return<>
        <form action="needs-validation" noValidate onSubmit={(event)=>{onSubmitHandlerLogin(event, setUser, credentials, setCredentials, navigate)}} className="col col-8 offset-2 mt-5">
            <h1 className="my-5">Login</h1>
            <label htmlFor="email">Email</label>
            <input type="email" className="form-control" name="email" id="email" value={credentials.email} required onChange={onChangeHandler}/>

            <label htmlFor="password">Password</label>
            <input type="password" className="form-control" name="password" required onChange={onChangeHandler} value={credentials.password}/> <br /><br />
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    
    </>
}