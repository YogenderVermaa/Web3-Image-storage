import {createBrowserRouter} from "react-router-dom";
import Wallet from "../pages/Wallet";
import Home from "../pages/Home";
import ProtectedRoute from "./protectedRoute";
import Upload from "../pages/Upload";
import Layout from "../Layout";
import LayoutWithoutHeader from "../LayoutN";


export const routes = createBrowserRouter([


    {
        path:"/",
        element:<LayoutWithoutHeader/>,
        children:[
            {
                path:"/",element:<Wallet/>
            }
        ]
    },
    {
        path:'/',
        element:<Layout/>,
        children:[
            {path:'/', element:<Wallet/>},
            {path:'/home', element:<ProtectedRoute><Home/></ProtectedRoute>},
            {path:'/upload-image', element:<ProtectedRoute><Upload/></ProtectedRoute>},
        ]
    }
])
