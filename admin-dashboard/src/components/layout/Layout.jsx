import { useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import { LayoutDashboard, Package, ShoppingCart, Users } from "lucide-react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

const mobileNav = [
  { to: "/", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/products", icon: Package, label: "Products" },
  { to: "/orders", icon: ShoppingCart, label: "Orders" },
  { to: "/users", icon: Users, label: "Users" },
];

export function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden
        />
      )}
      <div className="lg:pl-64">
        <Header onMenuClick={() => setSidebarOpen((o) => !o)} />
        <main className="p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
      <div
        className={`fixed left-0 top-0 z-40 h-full w-64 transform border-r border-gray-200 bg-white shadow-xl transition-transform duration-200 lg:hidden ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-14 items-center border-b px-4">
          <span className="font-semibold text-primary-600">
            HK Dealers Admin
          </span>
        </div>
        <nav className="space-y-0.5 p-4">
          {mobileNav.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium ${
                  isActive
                    ? "bg-primary-50 text-primary-700"
                    : "text-gray-700 hover:bg-gray-100"
                }`
              }
            >
              <Icon className="h-5 w-5" />
              {label}
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
}
