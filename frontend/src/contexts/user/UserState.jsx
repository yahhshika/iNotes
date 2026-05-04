import { useEffect, useState } from "react";
import userContext from "./UserContext";

export default function UserState(props){
    let [user, setUser] = useState(null)

    return <>
    <userContext.Provider value = {{user,setUser}}>
        {props.children}
    </userContext.Provider>
    </>
}