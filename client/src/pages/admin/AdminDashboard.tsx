import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import {
  AlertTriangleIcon,
  ArrowRightIcon,
  PackageIcon,
  ShoppingBagIcon,
  TrendingUpIcon,
  UsersIcon,
} from "lucide-react"
import Loading from "../../components/Loading"
import {statusColors } from "../../assets/assets"
import api from "../../config/api"

interface Stats {
  totalOrders: number
  totalUsers: number
  totalProducts: number
  outOfStock: number
  recentOrders: any[]
}

const statCards = (stats: Stats) => [
  {
    label: "Total Orders",
    value: stats.totalOrders,
    icon: ShoppingBagIcon,
    accent: "bg-[#2d4a2d]",
    iconBg: "bg-[#86c75a]/15",
    iconColor: "text-[#3b6d11]",
  },
  {
    label: "Total Users",
    value: stats.totalUsers,
    icon: UsersIcon,
    accent: "bg-blue-600",
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
  },
  {
    label: "Total Products",
    value: stats.totalProducts,
    icon: PackageIcon,
    accent: "bg-purple-600",
    iconBg: "bg-purple-50",
    iconColor: "text-purple-600",
  },
  {
    label: "Out of Stock",
    value: stats.outOfStock,
    icon: AlertTriangleIcon,
    accent: "bg-app-orange",
    iconBg: "bg-orange-50",
    iconColor: "text-app-orange",
  },
]

export default function AdminDashboard() {
  const currency = import.meta.env.VITE_CURRENCY_SYMBOL || "₹"
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get("/admin/status")
    .then((res)=> setStats(res.data))
    .catch(()=>{})
    .finally(()=> setLoading(false))
  }, [])

  if (loading) return <Loading />

  return (
    <div className="space-y-6">

      {/* Page header */}
      <div>
        <p className="text-[11px] font-semibold text-app-green-accent tracking-widest uppercase mb-1">
          Overview
        </p>
        <h1 className="font-serif text-2xl sm:text-3xl text-app-text leading-tight">
          Dashboard
        </h1>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {stats && statCards(stats, currency).map((card) => (
          <div
            key={card.label}
            className="bg-white border border-app-border rounded-2xl p-5 flex flex-col gap-3 hover:border-app-cream-darker hover:shadow-[0_2px_12px_rgba(26,46,26,0.06)] transition-all"
          >
            {/* Icon */}
            <div className={`size-9 rounded-[10px] flex items-center justify-center ${card.iconBg}`}>
              <card.icon className={`size-4 ${card.iconColor}`} strokeWidth={1.75} />
            </div>

            {/* Value + label */}
            <div>
              <p className="text-[26px] font-bold text-app-text leading-none mb-1">
                {card.value.toLocaleString()}
              </p>
              <p className="text-[12px] text-app-text-light font-medium">
                {card.label}
              </p>
            </div>

            {/* Accent bar */}
            <div className={`h-1 rounded-full ${card.accent} opacity-20`} />
          </div>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="bg-white border border-app-border rounded-2xl overflow-hidden">

        {/* Table header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-app-border">
          <div className="flex items-center gap-2">
            <TrendingUpIcon className="size-4 text-app-green-accent" strokeWidth={1.75} />
            <h2 className="text-[14.5px] font-semibold text-app-text">Recent Orders</h2>
          </div>
          <Link
            to="/admin/orders"
            className="inline-flex items-center gap-1 text-[12.5px] font-medium text-[#3b6d11] hover:text-app-green transition-colors"
          >
            View all <ArrowRightIcon className="size-3.5" />
          </Link>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left whitespace-nowrap">

            <thead>
              <tr className="bg-app-cream/60 border-b border-app-border">
                {["Order ID", "Customer", "Items", "Total", "Status", "Date"].map((h) => (
                  <th
                    key={h}
                    className="px-5 py-3 text-[10px] font-bold text-app-text-light uppercase tracking-widest"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-app-border">
              {!stats?.recentOrders.length ? (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center">
                    <p className="text-[13px] text-app-text-faint font-light">
                      No orders yet
                    </p>
                  </td>
                </tr>
              ) : (
                stats.recentOrders.map((order: any) => (
                  <tr
                    key={order.id}
                    className="hover:bg-app-cream/40 transition-colors"
                  >
                    {/* Order ID */}
                    <td className="px-5 py-3.5">
                      <span className="text-[12px] font-bold font-mono text-app-text-muted tracking-wide">
                        #{order.id.slice(-6).toUpperCase()}
                      </span>
                    </td>

                    {/* Customer */}
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <div className="size-7 rounded-lg bg-app-green-light flex items-center justify-center shrink-0">
                          <span className="text-[11px] font-bold text-white">
                            {(order.user?.name || "?").charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <p className="text-[13px] font-semibold text-app-text leading-tight">
                            {order.user?.name || "-"}
                          </p>
                          <p className="text-[11px] text-app-text-faint">
                            {order.user?.email || ""}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Items */}
                    <td className="px-5 py-3.5">
                      <span className="text-[12.5px] text-app-text-muted">
                        {order.items?.length ?? 0} item{order.items?.length !== 1 ? "s" : ""}
                      </span>
                    </td>

                    {/* Total */}
                    <td className="px-5 py-3.5">
                      <span className="text-[13px] font-bold text-app-text">
                        {currency}{order.total?.toFixed(0)}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="px-5 py-3.5">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10.5px] font-bold ${
                        statusColors[order.status] ?? "bg-gray-100 text-gray-600"
                      }`}>
                        {order.status}
                      </span>
                    </td>

                    {/* Date */}
                    <td className="px-5 py-3.5">
                      <span className="text-[12px] text-app-text-faint">
                        {new Date(order.createdAt).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  )
}