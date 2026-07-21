import { Outlet } from "react-router-dom";

export default function LayoutWithoutHeader() {
  return (
    <div className="min-h-screen w-full bg-zinc-950 text-white">
      <Outlet />
    </div>
  );
}
