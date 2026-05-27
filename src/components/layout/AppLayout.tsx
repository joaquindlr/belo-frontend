import { Outlet } from "react-router-dom";

function AppLayout() {
  return (
    <div className="flex h-screen w-full bg-zinc-100 font-sans text-zinc-900">
      <aside className="w-64 bg-zinc-950 text-zinc-50 flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-zinc-800 font-semibold text-xl tracking-tight">
          Belo Fintech Platform
        </div>
        <nav className="flex-1 p-4"></nav>
      </aside>
      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="h-16 bg-white border-b border-zinc-200 flex items-center px-6 shadow-sm z-10">
          <h2 className="text-lg font-semibold text-zinc-800">
            Panel de Control
          </h2>
        </header>
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AppLayout;
