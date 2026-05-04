import { useContext } from "react"
import userContext from "../../contexts/user/UserContext"
import noteContext from "../../contexts/notes/NoteContext";
export default function Profile(){
    let {user} = useContext(userContext);
    return <>
        <div className="offcanvas  offcanvas-top bg-blueish" tabIndex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
            <div className="offcanvas-header">
                <h5 className="offcanvas-title text-align-center font-size-40" id="offcanvasExampleLabel"><i className="fa-solid fa-circle-user"></i> {user?.name || "no name"}</h5>
                <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body">
                <div className="dropdown mt-1 link-secondary">
                    {/* <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">
                        Dropdown button
                    </button>
                    <ul className="dropdown-menu">
                        <li><a className="dropdown-item" href="#">Action</a></li>
                        <li><a className="dropdown-item" href="#">Another action</a></li>
                        <li><a className="dropdown-item" href="#">Something else here</a></li>
                    </ul> */}
                    No more info available.

                </div>
            </div>
        </div>
    </>
}