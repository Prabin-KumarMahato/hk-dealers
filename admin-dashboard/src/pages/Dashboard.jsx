import { useState, useEffect } from "react";
import { getAdminStats } from "../api/axios";
import { Users, ShoppingCart, Package, DollarSign } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const statCards = [
  {
    key: "totalUsers",
    label: "Total Users",
    icon: Users,
    color: "bg-blue-500",
  },
  {
    key: "totalOrders",
    label: "Total Orders",
    icon: ShoppingCart,
    color: "bg-emerald-500",
  },
  {
    key: "totalProducts",
    label: "Total Products",
    icon: Package,
    color: "bg-amber-500",
  },
  {
    key: "totalRevenue",
    label: "Revenue",
    icon: DollarSign,
    color: "bg-violet-500",
  },
];

export function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getAdminStats()
      .then(setStats)
      .catch((err) =>
        setError(err.response?.data?.message || "Failed to load stats"),
      )
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary-500 border-t-transparent" />
      </div>
    );
  }

  if (error) {
    return <div className="rounded-lg bg-red-50 p-4 text-red-700">{error}</div>;
  }

  const chartData = [
    { name: "Users", value: stats?.totalUsers ?? 0 },
    { name: "Orders", value: stats?.totalOrders ?? 0 },
    { name: "Products", value: stats?.totalProducts ?? 0 },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map(({ key, label, icon: Icon, color }) => (
          <div
            key={key}
            className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">{label}</p>
                <p className="mt-1 text-2xl font-semibold text-gray-900">
                  {key === "totalRevenue"
                    ? `₹${Number(stats?.[key] ?? 0).toLocaleString()}`
                    : (stats?.[key] ?? 0)}
                </p>
              </div>
              <div className={`rounded-lg p-3 ${color}`}>
                <Icon className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <h2 className="mb-4 text-lg font-medium text-gray-900">Overview</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="value" fill="#2563eb" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
