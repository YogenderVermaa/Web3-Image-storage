import { Outlet } from "react-router-dom";
import Header from "./components/header";

export default function Layout() {
  return (
    <div className="w-full overflow-y-scroll scrollbar-hide min-h-screen bg-gradient-to-br from-blue-500 via-indigo-500 to-indigo-200">
      
      {/* Fixed Header */}
      <Header />

      {/* Scrollable Page Content */}
      <main className="pt-20 pb-10 px-4 sm:px-8 md:px-16 lg:px-32 min-h-screen">
        <Outlet />
      </main>

    </div>
  );
}

