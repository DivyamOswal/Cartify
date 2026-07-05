import {
  CheckCircleIcon,
  ClockIcon,
  MapPinIcon,
  PackageIcon,
  PhoneIcon,
  TruckIcon,
  XCircleIcon,
} from "lucide-react"
import type { Order } from "../../types"
import { statusColors } from "../../assets/assets"

interface DeliveryOrderCardProps {
  order: Order
  tab: "active" | "completed"
  handleUpdateStatus: (orderId: string, status: string) => void
  setOtpModal: (orderId: string) => void
  setCancelModal: (orderId: string) => void
}

export default function DeliveryOrderCard({
  order,
  tab,
  handleUpdateStatus,
  setOtpModal,
  setCancelModal,
}: DeliveryOrderCardProps) {
  const currency = import.meta.env.VITE_CURRENCY_SYMBOL || "₹"
  const user = typeof order.user === "object"
    ? order.user
    : { name: "Customer", email: "", phone: "" }

  const nextStatus = order.status === "Assigned"
    ? "Packed"
    : order.status === "Packed"
    ? "Out for Delivery"
    : null

  return (
    <div className="bg-white border border-app-border rounded-2xl overflow-hidden hover:border-app-cream-darker hover:shadow-[0_2px_12px_rgba(26,46,26,0.06)] transition-all">

      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-app-border bg-app-cream/50">
        <div className="flex items-center gap-2.5">
          <span className="text-[12px] font-bold text-app-text-muted font-mono tracking-wide">
            #{order.id.slice(-6).toUpperCase()}
          </span>
          <span className={`px-2.5 py-0.5 text-[10.5px] font-bold rounded-full ${
            statusColors[order.status] ?? "bg-gray-100 text-gray-600"
          }`}>
            {order.status}
          </span>
        </div>
        <span className="text-[14px] font-bold text-app-text">
          {currency}{order.total.toFixed(0)}
        </span>
      </div>

      {/* Body */}
      <div className="px-5 py-4 space-y-3.5">

        {/* Customer */}
        <div className="flex items-center gap-3">
          <div className="size-9 rounded-[8px] bg-app-green-light flex items-center justify-center shrink-0">
            <span className="text-[13px] font-bold text-white">
              {user.name?.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="min-w-0">
            <p className="text-[13.5px] font-semibold text-app-text leading-tight truncate">
              {user.name}
            </p>
            {user.phone && (
              <p className="text-[11.5px] text-app-text-faint flex items-center gap-1 mt-0.5">
                <PhoneIcon className="size-3" strokeWidth={1.75} />
                {user.phone}
              </p>
            )}
          </div>
        </div>

        {/* Address */}
        <div className="flex items-start gap-2.5 p-3 bg-app-cream rounded-xl border border-app-border">
          <MapPinIcon className="size-3.5 text-app-green-accent shrink-0 mt-0.5" strokeWidth={1.75} />
          <p className="text-[12.5px] text-app-text-muted leading-snug">
            {order.shippingAddress.address},{" "}
            {order.shippingAddress.city},{" "}
            {order.shippingAddress.state} – {order.shippingAddress.zip}
          </p>
        </div>

        {/* Meta row */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-[11.5px] text-app-text-faint">
            <PackageIcon className="size-3.5 text-app-green-accent" strokeWidth={1.75} />
            {order.items.length} item{order.items.length !== 1 ? "s" : ""}
          </div>
          <span className="text-app-text-faint">·</span>
          <div className="flex items-center gap-1.5 text-[11.5px] text-app-text-faint">
            <span className="font-medium text-app-text-muted uppercase tracking-wide text-[10.5px]">
              {order.paymentMethod}
            </span>
          </div>
          {order.isPaid && (
            <>
              <span className="text-app-text-faint">·</span>
              <span className="text-[10.5px] font-bold text-app-success bg-green-50 px-1.5 py-0.5 rounded-full">
                Paid
              </span>
            </>
          )}
        </div>

      </div>

      {/* Actions — active orders */}
      {tab === "active" && (
        <div className="px-5 py-3.5 border-t border-app-border bg-app-cream/30 flex flex-wrap gap-2">

          {/* Progress action */}
          {nextStatus && (
            <button
              onClick={() => handleUpdateStatus(order.id, nextStatus)}
              className="flex items-center gap-1.5 px-3.5 py-2 text-[12.5px] font-semibold bg-app-green hover:bg-app-green-lighter text-white rounded-xl transition-colors active:scale-[0.98]"
            >
              <TruckIcon className="size-3.5" strokeWidth={2} />
              {order.status === "Assigned" ? "Mark Packed" : "Out for Delivery"}
            </button>
          )}

          {/* Deliver — OTP */}
          {order.status === "Out for Delivery" && (
            <button
              onClick={() => setOtpModal(order.id)}
              className="flex items-center gap-1.5 px-3.5 py-2 text-[12.5px] font-semibold bg-green-600 hover:bg-green-700 text-white rounded-xl transition-colors active:scale-[0.98]"
            >
              <CheckCircleIcon className="size-3.5" strokeWidth={2} />
              Mark Delivered
            </button>
          )}

          {/* Cancel */}
          <button
            onClick={() => setCancelModal(order.id)}
            className="flex items-center gap-1.5 px-3.5 py-2 text-[12.5px] font-semibold text-app-error bg-red-50 hover:bg-red-100 border border-red-200 rounded-xl transition-colors"
          >
            <XCircleIcon className="size-3.5" strokeWidth={2} />
            Cancel
          </button>

        </div>
      )}

      {/* Footer — completed orders */}
      {tab === "completed" && (
        <div className="px-5 py-3 border-t border-app-border flex items-center justify-between">
          <p className="text-[11.5px] text-app-text-faint flex items-center gap-1.5">
            <ClockIcon className="size-3.5" strokeWidth={1.75} />
            {new Date(order.createdAt).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </p>
          <span className={`text-[10.5px] font-bold px-2.5 py-0.5 rounded-full ${
            statusColors[order.status] ?? "bg-gray-100 text-gray-600"
          }`}>
            {order.status}
          </span>
        </div>
      )}

    </div>
  )
}