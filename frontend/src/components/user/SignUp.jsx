import { useContext, useState } from "react"
import { onSubmitHandlerSignUp } from "../../services/User/user";
import userContext from "../../contexts/user/UserContext";
import { useNavigate } from "react-router-dom";
export default function SignUp(){
    let navigate = useNavigate();
    let {setUser} = useContext(userContext);
    let [credentials, setCredentials] = useState({name:"",email:"", password:""});
    let onChangeHandler = (event)=>{
        setCredentials(prev=>{
            return {...prev, [event.target.name]:event.target.value};
        })
    }
   
    return<>
        <form action="needs-validation" noValidate onSubmit={(event)=>{onSubmitHandlerSignUp(event, setUser, credentials, setCredentials, navigate)}} className="col col-8 offset-2 mt-5">
            <h1 className="my-5">Sign Up</h1>
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" value={credentials.name} id="name" name="name" className="form-control" onChange={onChangeHandler} required/>

            <label htmlFor="email" className="form-label">Email</label>
            <input type="email" className="form-control" name="email" id="email" value={credentials.email} required onChange={onChangeHandler}/>

            <label htmlFor="password">Password</label>
            <input type="password" className="form-control" name="password" required onChange={onChangeHandler} value={credentials.password}/> <br /><br />
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    
    </>
}