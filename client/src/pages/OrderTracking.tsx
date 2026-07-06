import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import type { Order } from "../types"
import Loading from "../components/Loading"
import {
  ArrowLeftIcon,
  MapPinIcon,
  PhoneIcon,
  ReceiptIcon,
  TruckIcon,
} from "lucide-react"
import OrderOTP from "../components/OrderTracking/OrderOTP"
import LiveMap from "../components/OrderTracking/LiveMap"
import OrderTimeLine from "../components/OrderTracking/OrderTimeLine"
import api from "../config/api"

const statusStyle: Record<string, string> = {
  Delivered:         "bg-green-50 text-green-700 border border-green-200",
  Cancelled:         "bg-red-50 text-red-600 border border-red-200",
  Placed:            "bg-blue-50 text-blue-600 border border-blue-200",
  "Out for Delivery":"bg-orange-50 text-app-orange border border-orange-200",
}

const OrderTracking = () => {
  const currency = import.meta.env.VITE_CURRENCY_SYMBOL || "₹"
  const { id } = useParams()
  const navigate = useNavigate()
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)
  const [liveLocation, setLiveLocation] = useState<{ lat: number; lng: number } | null>(null)

  useEffect(() => {
    api.get(`/orders/${id}`).then((res)=> setOrder(res.data.order)).catch(()=> navigate("/orders")).finally(()=> setLoading(false))
  }, [id, navigate])

  useEffect(()=>{
    if(!order || ["Delivered","Cancelled", "Placed"].includes(order.status)) return

    const fetchLocation = async()=>{
      try {
        const {data} = await api.get(`/orders/${id}/location`)
        if(data.liveLocation?.lat && data.liveLocation?.lng && data.liveLocation.updatedAt){
          setLiveLocation({
            lat: data.liveLocation.lat,
            lng: data.liveLocation.lng
          })
        }
        // Also update order status if it changed
        if(data.status && data.status !== order.status){
          setOrder((prev)=> prev ? {...prev, status: data.status}: prev)
        }
      } catch {
        
      }
    }
    fetchLocation()

    const interval = setInterval(fetchLocation, 10000)
    return ()=> clearInterval(interval)
  },[id, order?.status])

  if (loading) return <Loading />
  if (!order) return (
    <div className="min-h-screen bg-app-cream flex items-center justify-center">
      <div className="text-center">
        <h2 className="font-serif text-2xl text-app-text mb-2">Order not found</h2>
        <button onClick={() => navigate("/orders")} className="text-[13px] text-app-green hover:underline">
          Back to orders
        </button>
      </div>
    </div>
  )

  const isActive = order.status !== "Delivered" && order.status !== "Cancelled"

  return (
    <div className="min-h-screen bg-app-cream">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Back */}
        <button
          onClick={() => navigate("/orders")}
          className="flex items-center gap-1.5 text-[13px] text-app-text-muted hover:text-app-green mb-6 transition-colors"
        >
          <ArrowLeftIcon className="size-3.5" /> Back to Orders
        </button>

        {/* Page header */}
        <div className="flex items-start justify-between mb-8 gap-4">
          <div>
            <p className="text-[11px] font-semibold text-app-green-accent tracking-widest uppercase mb-1.5">
              Order Tracking
            </p>
            <h1 className="font-serif text-2xl sm:text-3xl text-app-text leading-tight">
              #{order.id.slice(-8).toUpperCase()}
            </h1>
            <p className="text-[13px] text-app-text-light mt-1 font-light">
              Placed on{" "}
              {new Date(order.createdAt).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>
          <span
            className={`shrink-0 px-3 py-1.5 text-[12px] font-semibold rounded-full ${
              statusStyle[order.status] ?? "bg-gray-100 text-gray-600 border border-gray-200"
            }`}
          >
            {order.status}
          </span>
        </div>

        <div className="grid lg:grid-cols-3 gap-5">

          {/* LEFT - Timeline + Map + Delivery partner */}
          <div className="lg:col-span-2 space-y-5">

            {/* OTP card */}
            <OrderOTP order={order} />

            {/* Live map */}
            <LiveMap order={order} liveLocation={liveLocation} />

            {/* Timeline */}
            <OrderTimeLine order={order} />

            {/* Delivery partner */}
            {order.deliveryPartner && isActive && (
              <div className="bg-white border border-app-border rounded-2xl p-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="size-11 rounded-[10px] bg-app-green-light flex items-center justify-center shrink-0">
                    <span className="text-white font-semibold text-[14px]">
                      {order.deliveryPartner.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="text-[13.5px] font-semibold text-app-text">
                      {order.deliveryPartner.name}
                    </p>
                    <p className="text-[11.5px] text-app-text-light capitalize mt-0.5">
                      <span className="inline-flex items-center gap-1">
                        <TruckIcon className="size-3" strokeWidth={1.75} />
                        {order.deliveryPartner.vehicleType}
                      </span>
                      {" "}· Delivery Partner
                    </p>
                  </div>
                </div>
                
                  <a href={`tel:${order.deliveryPartner.phone}`}
                  className="size-9 bg-app-cream border border-app-border rounded-xl flex items-center justify-center hover:bg-app-cream-dark transition-colors"
                  aria-label="Call delivery partner"
                >
                  <PhoneIcon className="size-4 text-app-green" strokeWidth={1.75} />
                </a>
              </div>
            )}
          </div>

          {/* RIGHT - Address + Items + Summary */}
          <div className="space-y-4">

            {/* Delivery address */}
            <div className="bg-white border border-app-border rounded-2xl p-5">
              <h3 className="text-[10.5px] font-bold text-app-text-light uppercase tracking-widest mb-3 flex items-center gap-2">
                <MapPinIcon className="size-3.5 text-app-green-accent" strokeWidth={1.75} />
                Delivery Address
              </h3>
              <div className="text-[13px] text-app-text-muted leading-relaxed">
                {order.shippingAddress.label && (
                  <p className="font-semibold text-app-text mb-0.5">{order.shippingAddress.label}</p>
                )}
                <p>{order.shippingAddress.address}</p>
                <p>
                  {order.shippingAddress.city}, {order.shippingAddress.state} – {order.shippingAddress.zip}
                </p>
              </div>
            </div>

            {/* Items */}
            <div className="bg-white border border-app-border rounded-2xl p-5">
              <h3 className="text-[10.5px] font-bold text-app-text-light uppercase tracking-widest mb-4 flex items-center gap-2">
                <ReceiptIcon className="size-3.5 text-app-green-accent" strokeWidth={1.75} />
                Order Summary
              </h3>

              <div className="space-y-3 mb-4">
                {order.items.map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="size-10 rounded-lg bg-app-cream border border-app-border flex items-center justify-center shrink-0 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-contain p-0.5"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-semibold text-app-text truncate leading-snug">
                        {item.name}
                      </p>
                      <p className="text-[11px] text-app-text-faint mt-0.5">
                        Qty: {item.quantity} · {item.unit}
                      </p>
                    </div>
                    <span className="text-[13px] font-bold text-app-text shrink-0">
                      {currency}{(item.price * item.quantity).toFixed(0)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Price breakdown */}
              <div className="border-t border-app-border pt-3 space-y-2">
                <div className="flex justify-between text-[12.5px]">
                  <span className="text-app-text-light">Subtotal</span>
                  <span className="text-app-text">{currency}{order.subtotal.toFixed(0)}</span>
                </div>
                <div className="flex justify-between text-[12.5px]">
                  <span className="text-app-text-light">Delivery</span>
                  <span className={order.deliveryFee === 0 ? "text-app-success font-semibold" : "text-app-text"}>
                    {order.deliveryFee === 0 ? "Free" : `${currency}${order.deliveryFee.toFixed(0)}`}
                  </span>
                </div>
                <div className="flex justify-between text-[12.5px]">
                  <span className="text-app-text-light">Tax</span>
                  <span className="text-app-text">{currency}{order.tax.toFixed(0)}</span>
                </div>
                <div className="flex justify-between text-[14px] font-bold border-t border-app-border pt-2 mt-1">
                  <span className="text-app-text">Total</span>
                  <span className="text-app-green">{currency}{order.total.toFixed(0)}</span>
                </div>
              </div>

              {/* Payment method */}
              {order.paymentMethod && (
                <div className="mt-3 pt-3 border-t border-app-border flex justify-between text-[12px]">
                  <span className="text-app-text-light">Payment</span>
                  <span className="font-medium text-app-text capitalize">{order.paymentMethod}</span>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderTracking