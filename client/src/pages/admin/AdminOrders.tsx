import { useState, useEffect } from "react"
import { TruckIcon, UserCheckIcon, XIcon } from "lucide-react"
import toast from "react-hot-toast"
import type { DeliveryPartner } from "../../assets/types"
import Loading from "../../components/Loading"
import { dummyDashboardOrdersData, dummyDeliveryPartnerData } from "../../assets/assets"

const statusOptions = [
  "Placed", "Confirmed", "Assigned", "Packed",
  "Out for Delivery", "Delivered", "Cancelled",
]

const statusColors: Record<string, string> = {
  Placed:            "bg-blue-50 text-blue-700 border border-blue-200",
  Confirmed:         "bg-amber-50 text-amber-700 border border-amber-200",
  Assigned:          "bg-indigo-50 text-indigo-700 border border-indigo-200",
  Packed:            "bg-cyan-50 text-cyan-700 border border-cyan-200",
  "Out for Delivery":"bg-purple-50 text-purple-700 border border-purple-200",
  Delivered:         "bg-green-50 text-green-700 border border-green-200",
  Cancelled:         "bg-red-50 text-red-600 border border-red-200",
}

export default function AdminOrders() {
  const currency = import.meta.env.VITE_CURRENCY_SYMBOL || "₹"
  const [orders, setOrders] = useState<any[]>([])
  const [partners, setPartners] = useState<DeliveryPartner[]>([])
  const [loading, setLoading] = useState(true)
  const [assignModal, setAssignModal] = useState<string | null>(null)
  const [selectedPartner, setSelectedPartner] = useState("")

  useEffect(() => {
    setOrders(dummyDashboardOrdersData)
    setPartners(dummyDeliveryPartnerData as any)
    setTimeout(() => setLoading(false), 1000)
  }, [])

  const handleStatusChange = async (id: string, newStatus: string) => {
    console.log(id, newStatus)
  }

  const handleAssign = async () => {
    if (!assignModal || !selectedPartner) return
    toast.success("Delivery partner assigned!")
    setAssignModal(null)
    setSelectedPartner("")
  }

  if (loading) return <Loading />

  return (
    <>
      <div className="space-y-6">

        {/* Page header */}
        <div>
          <p className="text-[11px] font-semibold text-app-green-accent tracking-widest uppercase mb-1">
            Admin
          </p>
          <h1 className="font-serif text-2xl sm:text-3xl text-app-text leading-tight">
            Orders
          </h1>
          <p className="text-[13px] text-app-text-light mt-1 font-light">
            {orders.length} total order{orders.length !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Table card */}
        <div className="bg-white border border-app-border rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left whitespace-nowrap">

              <thead>
                <tr className="bg-app-cream/60 border-b border-app-border">
                  {["Order", "Customer", "Total", "Delivery Partner", "Status"].map((h) => (
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
                {orders.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center">
                      <p className="text-[13px] text-app-text-faint font-light">No orders found</p>
                    </td>
                  </tr>
                ) : (
                  orders.map((order: any) => (
                    <tr key={order._id} className="hover:bg-app-cream/30 transition-colors">

                      {/* Order ID + date */}
                      <td className="px-5 py-3.5">
                        <p className="text-[12.5px] font-bold font-mono text-app-text-muted tracking-wide">
                          #{order._id.slice(-6).toUpperCase()}
                        </p>
                        <p className="text-[11px] text-app-text-faint mt-0.5">
                          {new Date(order.createdAt).toLocaleDateString("en-IN", {
                            day: "numeric", month: "short", year: "numeric",
                          })}
                        </p>
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
                              {order.user?.name || "Unknown"}
                            </p>
                            <p className="text-[11px] text-app-text-faint">
                              {order.user?.email || "—"}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Total */}
                      <td className="px-5 py-3.5">
                        <span className="text-[13px] font-bold text-app-text">
                          {currency}{order.total.toFixed(0)}
                        </span>
                      </td>

                      {/* Delivery partner */}
                      <td className="px-5 py-3.5">
                        {order.deliveryPartner ? (
                          <div className="flex items-center gap-2">
                            <div className="size-7 rounded-lg bg-app-green-light flex items-center justify-center shrink-0">
                              <span className="text-[11px] font-bold text-white">
                                {order.deliveryPartner.name?.charAt(0).toUpperCase()}
                              </span>
                            </div>
                            <div>
                              <p className="text-[12.5px] font-semibold text-app-text leading-tight">
                                {order.deliveryPartner.name}
                              </p>
                              <p className="text-[11px] text-app-text-faint">
                                {order.deliveryPartner.phone}
                              </p>
                            </div>
                          </div>
                        ) : (
                          <button
                            onClick={() => { setAssignModal(order._id); setSelectedPartner("") }}
                            className="flex items-center gap-1.5 px-3 py-1.5 text-[11.5px] font-semibold bg-app-green hover:bg-app-green-lighter text-white rounded-lg transition-colors"
                          >
                            <TruckIcon className="size-3" strokeWidth={2} />
                            Assign
                          </button>
                        )}
                      </td>

                      {/* Status select */}
                      <td className="px-5 py-3.5">
                        <select
                          value={order.status}
                          onChange={(e) => handleStatusChange(order._id, e.target.value)}
                          className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border-r-8 border-transparent outline-none cursor-pointer leading-tight ${
                            statusColors[order.status] ?? "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {statusOptions.map((s) => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </td>

                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Assign Partner Modal */}
      {assignModal && (
        <>
          <div
            onClick={() => setAssignModal(null)}
            className="fixed inset-0 bg-black/30 z-50 backdrop-blur-[2px]"
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <div className="bg-white rounded-3xl w-full max-w-sm shadow-[0_8px_40px_rgba(26,46,26,0.12)] animate-fade-in pointer-events-auto overflow-hidden">

              {/* Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-app-border">
                <div className="flex items-center gap-3">
                  <div className="size-8 bg-app-green rounded-[8px] flex items-center justify-center shrink-0">
                    <UserCheckIcon size={14} className="text-white" strokeWidth={2.2} />
                  </div>
                  <div>
                    <h3 className="text-[14.5px] font-semibold text-app-text leading-tight">
                      Assign Delivery Partner
                    </h3>
                    <p className="text-[11px] text-app-text-light font-light leading-tight">
                      Select an active partner for this order
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setAssignModal(null)}
                  className="size-8 flex items-center justify-center rounded-xl hover:bg-app-cream transition-colors"
                  aria-label="Close"
                >
                  <XIcon className="size-4 text-app-text-muted" />
                </button>
              </div>

              <div className="p-5 space-y-4">

                {partners.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <div className="size-12 rounded-2xl bg-app-cream border border-app-border flex items-center justify-center mb-3">
                      <TruckIcon className="size-5 text-app-text-faint" strokeWidth={1.5} />
                    </div>
                    <p className="text-[13px] font-medium text-app-text-muted">No partners available</p>
                    <p className="text-[11.5px] text-app-text-faint font-light mt-0.5">
                      Onboard a partner first
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2 max-h-56 overflow-y-auto no-scrollbar">
                    {partners.map((p) => {
                      const selected = selectedPartner === p._id
                      return (
                        <label
                          key={p._id}
                          className={`flex items-center gap-3 p-3 rounded-xl border-[1.5px] cursor-pointer transition-all
                            ${selected
                              ? "border-app-green bg-[#86c75a]/5 shadow-[0_0_0_1px_rgba(45,74,45,0.08)]"
                              : "border-app-border hover:border-app-cream-darker hover:bg-app-cream"
                            }`}
                        >
                          <input
                            type="radio"
                            name="partner"
                            value={p._id}
                            checked={selected}
                            onChange={() => setSelectedPartner(p._id)}
                            className="sr-only"
                          />
                          <div className="size-8 rounded-[8px] bg-app-green-light flex items-center justify-center shrink-0">
                            <span className="text-[12px] font-bold text-white">
                              {p.name.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-[13px] font-semibold text-app-text leading-tight truncate">
                              {p.name}
                            </p>
                            <p className="text-[11px] text-app-text-faint capitalize mt-0.5">
                              {p.vehicleType} · {p.phone}
                            </p>
                          </div>
                          {selected && (
                            <div className="size-5 rounded-full bg-app-green flex items-center justify-center shrink-0">
                              <svg className="size-3 text-white" viewBox="0 0 12 12" fill="none">
                                <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            </div>
                          )}
                        </label>
                      )
                    })}
                  </div>
                )}

                <div className="h-px bg-app-border" />

                <div className="flex gap-2.5">
                  <button
                    onClick={() => setAssignModal(null)}
                    className="flex-1 py-2.5 text-[13px] font-medium text-app-text-muted bg-app-cream hover:bg-app-cream-dark border border-app-border rounded-xl transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAssign}
                    disabled={!selectedPartner}
                    className="flex-1 py-2.5 text-[13px] font-semibold text-white bg-app-green hover:bg-app-green-lighter rounded-xl transition-colors disabled:opacity-50 active:scale-[0.98]"
                  >
                    Assign Partner
                  </button>
                </div>

              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}