import { Outlet } from "react-router-dom";
import AppSidebar from "./AppSidebar";
import Header from "./AppHeader";

function AppLayout() {
  return (
    <div className="flex h-screen w-full bg-zinc-100 overflow-hidden font-sans text-zinc-900">
      <AppSidebar />
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AppLayout;
