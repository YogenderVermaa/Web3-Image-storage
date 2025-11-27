import { Outlet } from "react-router-dom";
import Header from "./components/header";



function Layout() {
   return (
    <div className="w-screen h-screen overflow-hidden bg-gradient-to-b from-[#62a1ff] to-white">
        <Header/>
        <div className="w-full h-full flex justify-center items-center pt-16">
           <Outlet />
        </div>
    </div>
  );
}

export default Layout