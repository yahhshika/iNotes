import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./components/note/Home";
import Profile from "./components/user/Profile";
import NewNoteForm from "./components/note/NewNoteForm";
import PageNotFound from "./components/PageNotFound";
import Login from "./components/user/Login";
import SignUp from "./components/user/SignUp";
let router = createBrowserRouter([
    {
        path:"/",
        Component: App,
        children:[
            {
                index: true,
                Component:Home
            },
         
            {
                path:"note",
                Component:NewNoteForm
            },
            {
                path:"login",
                Component:Login
            },
            {
                path:"signup",
                Component:SignUp
            },
            {
                path:"*",
                Component:PageNotFound
            }
        ]
    },
])
export default router;