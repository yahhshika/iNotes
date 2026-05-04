import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import UserState from './contexts/user/UserState.jsx'
import { RouterProvider } from 'react-router-dom'
import router from './Router.jsx'
import "./index.css";
createRoot(document.getElementById('root')).render(

    <UserState>
      <RouterProvider router={router}/>
    </UserState>

)
