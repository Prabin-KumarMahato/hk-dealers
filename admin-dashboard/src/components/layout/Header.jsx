import { Menu } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export function Header({ onMenuClick }) {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-20 flex h-14 items-center gap-4 border-b border-gray-200 bg-white px-4 shadow-sm lg:px-6">
      <button
        type="button"
        onClick={onMenuClick}
        className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 lg:hidden"
        aria-label="Toggle menu"
      >
        <Menu className="h-6 w-6" />
      </button>
      <div className="flex-1" />
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <span className="hidden sm:inline">{user?.name}</span>
        <span className="rounded bg-primary-100 px-2 py-0.5 text-xs font-medium text-primary-700">
          Admin
        </span>
      </div>
    </header>
  );
}
