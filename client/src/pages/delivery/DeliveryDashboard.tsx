import { useEffect, useRef, useState } from "react"
import { NavigationIcon, PackageIcon, TruckIcon } from "lucide-react"
import OtpModal from "../../components/Delivery/OtpModal"
import CancelModal from "../../components/Delivery/CancelModal"
import DeliveryOrderCard from "../../components/Delivery/DeliveryOrderCard"
import Loading from "../../components/Loading"
import type { Order } from "../../types"
import axios from "axios"
import toast from "react-hot-toast"

const API_URL = import.meta.env.VITE_BASE_URL || "http://localhost:5000/api"

const getAuthHeaders = ()=>({
  headers: {Authorization : `Bearer ${localStorage.getItem("delivery_token")}`}
})

export default function DeliveryDashboard() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState<"active" | "completed">("active")
  const [tracking, setTracking] = useState(false)

  const [otpModal, setOtpModal] = useState<string | null>(null)
  useEffect(() => {
}, [otpModal]);
  const [otp, setOtp] = useState("")
  const [submitting, setSubmitting] = useState(false)

  const [cancelModal, setCancelModal] = useState<string | null>(null)
  const [cancelReason, setCancelReason] = useState("")
  const watchIdRef = useRef<number | null>(null)

  const fetchOrders = async ()=>{
    setLoading(true)
    try {
      const {data} = await axios.get(`${API_URL}/delivery/my-deliveries?status=${tab}`, getAuthHeaders())
      setOrders(data.orders)
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to load deliveries")
    }finally{
      setLoading(false)
    }
  }

  

  // send location every 10s for active deliveries 
  useEffect(()=>{
    const activeOrders = orders.filter((o)=>["Assigned", "Packed", "Out for Delivery"].includes(o.status))

    if(activeOrders.length === 0 || !tracking){
      if(watchIdRef.current !==null){
        navigator.geolocation.clearWatch(watchIdRef.current)
        watchIdRef.current = null
      }
      return
    }

    const sendLocation = (pos: GeolocationPosition)=>{
      const {latitude: lat, longitude: lng} = pos.coords
      activeOrders.forEach((order)=>{
        axios.put(`${API_URL}/delivery/my-deliveries/${order.id}/location`, {lat, lng}, getAuthHeaders()).catch(()=>{})
      })
    }

    watchIdRef.current = navigator.geolocation.watchPosition(sendLocation, ()=>{},{enableHighAccuracy: true, maximumAge: 10000})

    // Also send on interval for more consistent updates
    const interval = setInterval(()=>{
      navigator.geolocation.getCurrentPosition(sendLocation, ()=>{},{enableHighAccuracy: true})
    },10000)

    return ()=>{
      if(watchIdRef.current !== null){
        navigator.geolocation.clearWatch(watchIdRef.current)
        watchIdRef.current = null
      }
      clearInterval(interval)
    }
  }, [orders, tracking])

  const handleUpdateStatus = async (orderId: string, status: string) => {
    try {
      await axios.put(`${API_URL}/delivery/my-deliveries/${orderId}/status`, {status}, getAuthHeaders())
      toast.success(`Status updated to ${status}`)
      fetchOrders()
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed")
    }finally{
      setSubmitting(false)
    }
  }

 const handleComplete = async () => {
  if (!otpModal || otp.length !== 6) return;

  setSubmitting(true);

  try {
    const { data } = await axios.put(
      `${API_URL}/delivery/my-deliveries/${otpModal}/complete`,
      { otp },
      getAuthHeaders()
    );

    toast.success(data.message || "Delivery completed successfully");

    setOtpModal(null);
    setOtp("");
    fetchOrders();
  } catch (error: any) {
    toast.error(error?.response?.data?.message || "Invalid OTP");
  } finally {
    setSubmitting(false);
  }
};

  const handleCancel = async () => {
    if (!cancelModal) return
    setSubmitting(true)
    try {
      await axios.put(`${API_URL}/delivery/my-deliveries/${cancelModal}/cancel`, {reason: cancelReason}, getAuthHeaders())
      toast.success("Delivery cancelled")
      setCancelModal(null)
      setCancelReason("")
      fetchOrders()
    } catch (error:any) {
      toast.error(error?.response?.data?.message || "Failed")
    }finally{
      setSubmitting(false)
    }}
  useEffect(() => {
    fetchOrders()
  }, [tab])

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
              key={order.id}
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