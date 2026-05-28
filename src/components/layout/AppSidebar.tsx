import { CheckSquare, LayoutDashboard, Send } from "lucide-react";
import { NavLink } from "react-router-dom";

const navItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Nueva Transacción", url: "/transacciones/nueva", icon: Send },
  { title: "Aprobaciones", url: "/aprobaciones", icon: CheckSquare },
];

function AppSidebar() {
  return (
    <aside className="w-64 bg-zinc-950 text-zinc-50 border-r border-zinc-800">
      <div className="h-16 flex items-center px-6 border-b border-zinc-800">
        <h1 className="text-xl font-bold tracking-tight">Belo Mini Fintech</h1>
      </div>

      <nav className="flex-1 p-4 flex flex-col gap-2">
        {navItems.map((item) => (
          <NavLink
            key={item.title}
            to={item.url}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium ${
                isActive
                  ? "bg-zinc-800 text-white"
                  : "text-zinc-400 hover:bg-zinc-800/50 hover:text-white"
              }`
            }
          >
            <item.icon className="h-4 w-4" />
            <span>{item.title}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

export default AppSidebar;
