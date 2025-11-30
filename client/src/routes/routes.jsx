import { createBrowserRouter } from "react-router-dom";
import Wallet from "../pages/Wallet.jsx";
import Home from "../pages/Home.jsx";
import ProtectedRoute from "./protectedRoute.jsx";
import Upload from "../pages/Upload.jsx";
import Layout from "../Layout.jsx";
import LayoutWithoutHeader from "../LayoutN.jsx";
import HowWeWork from "../pages/Work.jsx";

export const routes = createBrowserRouter([
  // Public routes (no header)
  {
    element: <LayoutWithoutHeader />,
    children: [
      { path: "/", element: <Wallet /> }, // Login page
    ],
  },

  // Private routes (with header)
  {
    element: <Layout />,
    children: [
      { path: "/home", element: <ProtectedRoute><HowWeWork/></ProtectedRoute> },
      { path: "/upload-image", element: <ProtectedRoute><Upload /></ProtectedRoute> },
      {path:"/work" , element:<ProtectedRoute><Home/></ProtectedRoute>}
    ],
  },

  // Catch all 404
  {
    path: "*",
    element: <LayoutWithoutHeader><h1>404 Not Found</h1></LayoutWithoutHeader>
  }
]);
