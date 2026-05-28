import { Outlet } from "react-router-dom";
import AppSidebar from "./AppSidebar";
import Header from "./AppHeader";
import { useTransactionSocket } from "../../hooks/useTransactionSocket";

function AppLayout() {
  useTransactionSocket();
  
  return (
    <div className="flex h-screen w-full bg-zinc-100 overflow-hidden font-sans text-zinc-900">
      <AppSidebar />
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AppLayout;
