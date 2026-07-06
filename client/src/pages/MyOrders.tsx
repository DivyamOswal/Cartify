import { useEffect, useState } from "react"
import type { Order } from "../types"
import { Link, useSearchParams } from "react-router-dom"
import {statusColors } from "../assets/assets"
import Loading from "../components/Loading"
import { CalendarIcon, ChevronRightIcon, PackageIcon, ShoppingBagIcon } from "lucide-react"
import { useCart } from "../context/CardContext"
import api from "../config/api"
import toast from "react-hot-toast"

const MyOrders = () => {
  const currency = import.meta.env.VITE_CURRENCY_SYMBOL || "₹"
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("all")
  const [searchParams, setSearchParams] = useSearchParams()
  const { clearCart } = useCart()

  const tabs = [
    { key: "all",              label: "All Orders"       },
    { key: "Placed",           label: "Placed"           },
    { key: "Out for Delivery", label: "Out for Delivery" },
    { key: "Delivered",        label: "Delivered"        },
  ]

  const fetchOrders = async () => {
    setLoading(true)
    try {
      const params = activeTab !== "all" ? `?status=${activeTab}` : ""
      const {data} = await api.get(`/orders${params}`)
      setOrders(data.orders)
    } catch (error: any) {
      toast.error(error.response?.data?.message || error?.message)
    }finally{
      setLoading(false)
    }
  }

  useEffect(() => {
    setLoading(true)
    if (searchParams.get("clearCart")) {
      clearCart()
      setSearchParams({})
      setTimeout(() => fetchOrders(), 1000)
    } else {
      fetchOrders()
    }
  }, [activeTab])

  // Filter orders by active tab
  const filteredOrders = activeTab === "all"
    ? orders
    : orders.filter((o) => o.status === activeTab)

  return (
    <div className="min-h-screen bg-app-cream">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Header */}
        <div className="mb-6">
          <p className="text-[11px] font-semibold text-app-green-accent tracking-widest uppercase mb-1.5">
            Account
          </p>
          <h1 className="font-serif text-2xl sm:text-3xl text-app-text leading-tight">
            My Orders
          </h1>
          <p className="text-[13px] text-app-text-light mt-1 font-light">
            {orders.length} order{orders.length !== 1 ? "s" : ""} placed
          </p>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1.5 flex-wrap mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2 text-[13px] font-medium rounded-xl whitespace-nowrap transition-all
                ${activeTab === tab.key
                  ? "bg-app-green text-white shadow-sm"
                  : "bg-white border border-app-border text-app-text-muted hover:bg-app-cream"
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        {loading ? (
          <Loading />
        ) : filteredOrders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="size-16 rounded-2xl bg-white border border-app-border flex items-center justify-center mb-4 shadow-sm">
              <PackageIcon className="size-7 text-app-text-faint" strokeWidth={1.5} />
            </div>
            <h3 className="font-serif text-xl text-app-text mb-2">
              {activeTab === "all" ? "No orders yet" : `No ${activeTab.toLowerCase()} orders`}
            </h3>
            <p className="text-[13px] text-app-text-light font-light mb-6">
              {activeTab === "all"
                ? "Start shopping to see your orders here"
                : "Check back later or view all orders"
              }
            </p>
            <Link
              to="/products"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-app-green hover:bg-app-green-lighter text-white text-[13px] font-semibold rounded-xl transition-colors"
            >
              <ShoppingBagIcon className="size-3.5" />
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredOrders.map((order) => (
              <Link
                key={order.id}
                to={`/orders/${order.id}`}
                className="flex flex-col bg-white border border-app-border rounded-2xl p-5 hover:border-app-cream-darker hover:shadow-[0_2px_12px_rgba(26,46,26,0.06)] transition-all"
              >
                {/* Top row - order ID, date, status */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-[13px] font-bold text-app-text">
                      #{order.id.slice(-8).toUpperCase()}
                    </p>
                    <div className="flex items-center gap-1.5 mt-1">
                      <CalendarIcon className="size-3 text-app-text-faint" />
                      <span className="text-[11.5px] text-app-text-faint">
                        {new Date(order.createdAt).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-3 py-1 text-[11px] font-semibold rounded-full ${
                        statusColors[order.status] || "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {order.status}
                    </span>
                    <ChevronRightIcon className="size-4 text-app-text-faint" />
                  </div>
                </div>

                {/* Item thumbnails */}
                <div className="flex items-center gap-2 mb-4">
                  {order.items.slice(0, 4).map((item, i) => (
                    <div
                      key={i}
                      className="size-12 sm:size-14 rounded-xl bg-app-cream border border-app-border overflow-hidden flex items-center justify-center shrink-0"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-contain p-1"
                      />
                    </div>
                  ))}
                  {order.items.length > 4 && (
                    <div className="size-12 sm:size-14 rounded-xl bg-app-cream border border-app-border flex items-center justify-center shrink-0">
                      <span className="text-[11px] font-semibold text-app-text-muted">
                        +{order.items.length - 4}
                      </span>
                    </div>
                  )}
                </div>

                {/* Bottom row - items count + total */}
                <div className="flex items-center justify-between pt-3 border-t border-app-border">
                  <span className="text-[12.5px] text-app-text-muted">
                    {order.items.length} item{order.items.length !== 1 ? "s" : ""}
                  </span>
                  <span className="text-[14px] font-bold text-app-text">
                    {currency}{order.total.toFixed(0)}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}

      </div>
    </div>
  )
}

export default MyOrders