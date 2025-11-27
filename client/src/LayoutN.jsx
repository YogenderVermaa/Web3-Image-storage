import { Outlet } from "react-router-dom";

export default function LayoutWithoutHeader() {
  return (
    <div className="w-full min-h-screen bg-slate-950  flex items-center justify-center p-4">
      <Outlet />
    </div>
  );
}

