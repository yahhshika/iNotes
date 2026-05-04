import { useState } from "react";
import errorContext from "./ErrorContext";

export default function ErrorState({props}){
    let [error, setError] = useState(null);
    return <>
    <errorContext.Provider value={{error, setError}}>
        {props.children}
    </errorContext.Provider>
    </>
}