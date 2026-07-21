import { Outlet } from "react-router-dom";
import Header from "./components/Header.jsx";

export default function Layout() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-zinc-950 text-white">
      <Header />

      <main className="pt-16 min-h-screen">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
          <Outlet />
        </div>
      </main>

      <footer className="border-t border-zinc-800 bg-zinc-950">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-5 text-sm text-zinc-500 sm:flex-row sm:px-6 lg:px-8">
          <p>Copyright 2025 ImageVault. Secured by blockchain technology.</p>
          <div className="flex items-center gap-5">
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Terms</a>
            <a href="#" className="hover:text-white">Docs</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
