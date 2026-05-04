import Navbar from "./components/Navbar"
import { Outlet } from "react-router-dom"

import noteContext from "./contexts/notes/NoteContext"
import NoteState from "./contexts/notes/NoteState"
import UserState from "./contexts/user/UserState"
import Profile from "./components/user/Profile"
import { useEffect, useContext, useState } from "react"
import userContext from "./contexts/user/UserContext"
import { authenticate } from "./services/User/user"
function App() {
  let {setUser} = useContext(userContext);
  useEffect(()=>{
   
    authenticate(setUser);
  },[])

  
  return (
    <>
      <NoteState>
   

          <Navbar/>
            <Profile/>
    
          <div className="container my-3" style={{minHeight:"100vh"}}>
       
            <Outlet/>
    
          </div>
      </NoteState>
    </>
  )
}

export default App;
