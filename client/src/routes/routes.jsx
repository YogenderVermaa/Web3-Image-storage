import { createBrowserRouter } from "react-router-dom";
import Wallet from "../pages/Wallet";
import Home from "../pages/Home";
import ProtectedRoute from "./protectedRoute";
import Upload from "../pages/Upload";
import Layout from "../Layout";
import LayoutWithoutHeader from "../LayoutN";

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
      { path: "/home", element: <ProtectedRoute><Home /></ProtectedRoute> },
      { path: "/upload-image", element: <ProtectedRoute><Upload /></ProtectedRoute> },
    ],
  },

  // Catch all 404
  {
    path: "*",
    element: <LayoutWithoutHeader><h1>404 Not Found</h1></LayoutWithoutHeader>
  }
]);
