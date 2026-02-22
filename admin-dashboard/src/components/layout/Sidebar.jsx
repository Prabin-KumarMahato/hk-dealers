import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  LogOut,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const nav = [
  { to: "/", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/products", icon: Package, label: "Products" },
  { to: "/orders", icon: ShoppingCart, label: "Orders" },
  { to: "/users", icon: Users, label: "Users" },
];

export function Sidebar() {
  const { logout } = useAuth();

  return (
    <aside className="fixed left-0 top-0 z-30 h-full w-64 border-r border-gray-200 bg-white shadow-sm lg:flex lg:flex-col hidden">
      <div className="flex h-14 items-center border-b border-gray-200 px-6">
        <span className="text-xl font-semibold text-primary-600">HK Dealers Admin</span>
      </div>
      <nav className="flex-1 space-y-0.5 p-4">
        {nav.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/"}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-primary-50 text-primary-700"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`
            }
          >
            <Icon className="h-5 w-5 shrink-0" />
            {label}
          </NavLink>
        ))}
      </nav>
      <div className="border-t border-gray-200 p-4">
        <button
          type="button"
          onClick={logout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-600 hover:bg-red-50 hover:text-red-600"
        >
          <LogOut className="h-5 w-5" />
          Logout
        </button>
      </div>
    </aside>
  );
}
