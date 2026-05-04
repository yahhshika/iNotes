import { Link } from "react-router-dom"
import { useContext } from "react"
import userContext from "../contexts/user/UserContext"
import { logOut } from "../services/User/user";
import logo from "../../src/assets/logo.svg";
export default function Navbar(){
    let {user, setUser} = useContext(userContext);

    
    return <>
    <nav className="navbar navbar-expand-lg navbar-attached color-white" >
        <div className="container-fluid">
            <Link className="navbar-brand color-white" to="/"><img src={logo} alt=""  style={{width:"2.5rem"}}/> iNotes </Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                    <Link className="nav-link active color-white" aria-current="page" to="/">Home</Link>
                    {/* <Link className="nav-link" to="/profile">Profile</Link> */}
                    
                    <Link className="nav-link color-white" to="/note">Add New Note</Link>
                    
                    
                </div>
                <div className="navbar-nav ms-auto">
                    {user?
                    <div className="dropdown dropstart">
                        <button className="btn dropdown-toggle font-size-profile" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <i className="fa-solid fa-circle-user color-white"></i>
                        </button>
                        <ul className="dropdown-menu navbar-attached">
                            <li><a className="dropdown-item color-blue" href="#" onClick={(e)=>{  
                                e.preventDefault();logOut(setUser);}}>logout</a></li>
                            <li><Link className="dropdown-item color-blue" to="/signup">Create Another User</Link></li>
                            <li><a className="dropdown-item color-blue" data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample">More</a></li>
                        </ul>
                    </div>
                    : 
                    <>
                    <Link className="nav-link color-white" aria-current="page" to="/login">Login</Link>
                    <Link className="nav-link color-white" to="/signup">SignUp</Link>
                    </>
                    }
                </div>
            </div>
        </div>
    </nav>
    
    </>
}