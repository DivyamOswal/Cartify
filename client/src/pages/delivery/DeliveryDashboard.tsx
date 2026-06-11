import { useEffect, useState } from "react"
import { NavigationIcon, PackageIcon, TruckIcon } from "lucide-react"
import OtpModal from "../../components/Delivery/OtpModal"
import CancelModal from "../../components/Delivery/CancelModal"
import DeliveryOrderCard from "../../components/Delivery/DeliveryOrderCard"
import Loading from "../../components/Loading"
import type { Order } from "../../types"
import { dummyDashboardOrdersData } from "../../assets/assets"

export default function DeliveryDashboard() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState<"active" | "completed">("active")
  const [tracking, setTracking] = useState(false)

  const [otpModal, setOtpModal] = useState<string | null>(null)
  const [otp, setOtp] = useState("")
  const [submitting, setSubmitting] = useState(false)

  const [cancelModal, setCancelModal] = useState<string | null>(null)
  const [cancelReason, setCancelReason] = useState("")

  useEffect(() => {
    setLoading(true)
    setOrders(dummyDashboardOrdersData as any)
    setLoading(false)
  }, [tab])

  const handleUpdateStatus = async (orderId: string, status: string) => {
    console.log(orderId, status)
  }

  const handleComplete = async () => {
    if (!otpModal || !otp) return
    setSubmitting(true)
    setTimeout(() => {
      setSubmitting(false)
      setOtpModal(null)
      setOtp("")
    }, 1000)
  }

  const handleCancel = async () => {
    if (!cancelModal) return
    setSubmitting(true)
    setTimeout(() => {
      setSubmitting(false)
      setCancelModal(null)
      setCancelReason("")
    }, 1000)
  }

  const activeOrders    = orders.filter((o) => !["Delivered", "Cancelled"].includes(o.status))
  const completedOrders = orders.filter((o) =>  ["Delivered", "Cancelled"].includes(o.status))
  const displayOrders   = tab === "active" ? activeOrders : completedOrders

  return (
    <div className="space-y-6">

      {/* Page header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[11px] font-semibold text-app-green-accent tracking-widest uppercase mb-1">
            Delivery
          </p>
          <h1 className="font-serif text-2xl sm:text-3xl text-app-text leading-tight">
            My Deliveries
          </h1>
          <p className="text-[13px] text-app-text-light mt-1 font-light">
            {activeOrders.length} active · {completedOrders.length} completed
          </p>
        </div>

        {/* Location sharing toggle */}
        <button
          onClick={() => setTracking((prev) => !prev)}
          className={`shrink-0 flex items-center gap-2 px-4 py-2.5 text-[13px] font-semibold rounded-xl transition-all
            ${tracking
              ? "bg-app-green text-white shadow-sm"
              : "bg-white border border-app-border text-app-text-muted hover:bg-app-cream"
            }`}
        >
          <NavigationIcon
            className={`size-3.5 ${tracking ? "animate-pulse" : ""}`}
            strokeWidth={2}
          />
          {tracking ? (
            <span className="flex items-center gap-1.5">
              <span className="size-1.5 rounded-full bg-app-green-accent animate-pulse inline-block" />
              Sharing Location
            </span>
          ) : (
            "Share Location"
          )}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1.5">
        {(["active", "completed"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 text-[13px] font-medium rounded-xl transition-all
              ${tab === t
                ? "bg-app-green text-white shadow-sm"
                : "bg-white border border-app-border text-app-text-muted hover:bg-app-cream"
              }`}
          >
            {t === "active" ? (
              <span className="flex items-center gap-1.5">
                Active
                {activeOrders.length > 0 && (
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                    tab === "active" ? "bg-white/20 text-white" : "bg-app-orange/15 text-app-orange"
                  }`}>
                    {activeOrders.length}
                  </span>
                )}
              </span>
            ) : "Completed"}
          </button>
        ))}
      </div>

      {/* Content */}
      {loading ? (
        <Loading />
      ) : displayOrders.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-white border border-app-border rounded-2xl text-center">
          <div className="size-14 rounded-2xl bg-app-cream border border-app-border flex items-center justify-center mb-4">
            {tab === "active"
              ? <TruckIcon className="size-6 text-app-text-faint" strokeWidth={1.5} />
              : <PackageIcon className="size-6 text-app-text-faint" strokeWidth={1.5} />
            }
          </div>
          <h3 className="font-serif text-xl text-app-text mb-2">
            No {tab} deliveries
          </h3>
          <p className="text-[13px] text-app-text-light font-light max-w-xs">
            {tab === "active"
              ? "New assignments will appear here once dispatched"
              : "Completed and cancelled deliveries will show here"
            }
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {displayOrders.map((order) => (
            <DeliveryOrderCard
              key={order._id}
              order={order}
              tab={tab}
              handleUpdateStatus={handleUpdateStatus}
              setOtpModal={setOtpModal}
              setCancelModal={setCancelModal}
            />
          ))}
        </div>
      )}

      {/* Modals */}
      {otpModal && (
        <OtpModal
          setOtpModal={setOtpModal}
          otp={otp}
          setOtp={setOtp}
          handleComplete={handleComplete}
          submitting={submitting}
        />
      )}
      {cancelModal && (
        <CancelModal
          setCancelModal={setCancelModal}
          cancelReason={cancelReason}
          setCancelReason={setCancelReason}
          handleCancel={handleCancel}
          submitting={submitting}
        />
      )}

    </div>
  )
}