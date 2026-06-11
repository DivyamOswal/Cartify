import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CardContext'
import { dummyAddressData } from '../assets/assets'
import type { Address } from '../types'
import {
  ArrowLeftIcon,
  CheckIcon,
  CreditCardIcon,
  MapPinIcon,
  ShoppingBagIcon,
  TruckIcon,
} from 'lucide-react'
import CheckoutAddress from '../components/Checkout/CheckoutAddress'
import CheckoutPayment from '../components/Checkout/CheckoutPayment'
import CheckoutReview from '../components/Checkout/CheckoutReview'

const steps = [
  { key: "address", label: "Address", icon: MapPinIcon   },
  { key: "payment", label: "Payment", icon: CreditCardIcon },
  { key: "review",  label: "Review",  icon: CheckIcon    },
]

const Checkout = () => {
  const navigate = useNavigate()
  const currency = import.meta.env.VITE_CURRENCY_SYMBOL || "₹"
  const { items, cartTotal } = useCart()
  const { user } = { user: { addresses: dummyAddressData } }

  const [step, setStep]                 = useState("address")
  const [loading, setLoading]           = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("card")

  const [address, setAddress] = useState<Address>({
    _id: "", label: "Home", address: "", city: "",
    state: "", zip: "", isDefault: false, lat: 0, lng: 0,
  })

  // useEffect not useState for side effects
  useEffect(() => {
    if (user?.addresses?.length) {
      const def = user.addresses.find((a) => a.isDefault) ?? user.addresses[0]
      setAddress({
        _id:       def._id,
        label:     def.label,
        address:   def.address,
        city:      def.city,
        state:     def.state,
        zip:       def.zip,
        isDefault: def.isDefault,
        lat:       def.lat,
        lng:       def.lng,
      })
    }
  }, [])

  const deliveryFee = cartTotal > 400 ? 0 : 75
  const tax         = Math.round(cartTotal * 0.05)
  const total       = cartTotal + deliveryFee + tax

  const handlePlaceOrder = async () => {
    setLoading(true)
    navigate("/orders?clearCart=true")
  }

  const currentStepIdx = steps.findIndex((s) => s.key === step)

  // Empty cart guard
  if (items.length === 0) return (
    <div className="min-h-screen bg-app-cream flex items-center justify-center">
      <div className="text-center">
        <div className="size-16 rounded-2xl bg-white border border-app-border flex items-center justify-center mb-4 mx-auto shadow-sm">
          <ShoppingBagIcon className="size-7 text-app-text-faint" strokeWidth={1.5} />
        </div>
        <h2 className="font-serif text-xl text-app-text mb-2">Your cart is empty</h2>
        <p className="text-[13px] text-app-text-light font-light mb-6">
          Add some products before checking out
        </p>
        <button
          onClick={() => navigate("/products")}
          className="px-5 py-2.5 bg-app-green hover:bg-app-green-lighter text-white text-[13px] font-semibold rounded-xl transition-colors"
        >
          Browse Products
        </button>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-app-cream">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 text-[13px] text-app-text-muted hover:text-app-green mb-6 transition-colors"
        >
          <ArrowLeftIcon className="size-3.5" /> Back
        </button>

        {/* Page header */}
        <div className="mb-8">
          <p className="text-[11px] font-semibold text-app-green-accent tracking-widest uppercase mb-1.5">
            Secure Checkout
          </p>
          <h1 className="font-serif text-2xl sm:text-3xl text-app-text leading-tight">
            Complete Your Order
          </h1>
        </div>

        {/* Step indicator */}
        <div className="flex items-center mb-8">
          {steps.map((s, i) => {
            const isCompleted = i < currentStepIdx
            const isCurrent   = s.key === step
            return (
              <div key={s.key} className="flex items-center">
                <button
                  onClick={() => i < currentStepIdx && setStep(s.key)}
                  disabled={i > currentStepIdx}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-[13px] font-medium transition-all
                    ${isCurrent
                      ? "bg-app-green text-white shadow-sm"
                      : isCompleted
                      ? "bg-[#86c75a]/15 text-[#3b6d11] hover:bg-[#86c75a]/25 cursor-pointer"
                      : "bg-white border border-app-border text-app-text-faint cursor-not-allowed"
                    }`}
                >
                  {isCompleted
                    ? <CheckIcon className="size-3.5" strokeWidth={2.5} />
                    : <s.icon className="size-3.5" strokeWidth={isCurrent ? 2.5 : 1.75} />
                  }
                  <span className="hidden sm:inline">{s.label}</span>
                </button>
                {i < steps.length - 1 && (
                  <div className={`w-8 h-px mx-1 ${i < currentStepIdx ? "bg-[#86c75a]/40" : "bg-app-border"}`} />
                )}
              </div>
            )
          })}
        </div>

        {/* ✅ Fixed grid — was md-grid-cols-3 and md-cols-span-2 */}
        <div className="grid md:grid-cols-3 gap-6">

          {/* Main form */}
          <div className="md:col-span-2">
            {step === "address" && (
              <CheckoutAddress
                address={address}
                setAddress={setAddress}
                setStep={setStep}
                user={user}
              />
            )}
            {step === "payment" && (
              <CheckoutPayment
                paymentMethod={paymentMethod}
                setPaymentMethod={setPaymentMethod}
                setStep={setStep}
              />
            )}
            {step === "review" && (
              <CheckoutReview
                address={address}
                items={items}
                handlePlaceOrder={handlePlaceOrder}
                loading={loading}
                total={total}
              />
            )}
          </div>

          {/* Order summary sidebar */}
          <div className="bg-white border border-app-border rounded-2xl p-5 h-fit sticky top-24">

            <p className="text-[10.5px] font-bold text-app-text-light uppercase tracking-widest mb-4">
              Order Summary
            </p>

            {/* Item thumbnails */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {items.slice(0, 5).map((item) => (
                <div
                  key={item.product._id}
                  className="size-10 rounded-lg bg-app-cream border border-app-border overflow-hidden flex items-center justify-center"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-full h-full object-contain p-0.5"
                  />
                </div>
              ))}
              {items.length > 5 && (
                <div className="size-10 rounded-lg bg-app-cream border border-app-border flex items-center justify-center">
                  <span className="text-[10px] font-semibold text-app-text-muted">
                    +{items.length - 5}
                  </span>
                </div>
              )}
            </div>

            <div className="space-y-2 text-[13px]">
              <div className="flex justify-between">
                <span className="text-app-text-light">
                  Subtotal ({items.length} item{items.length !== 1 ? "s" : ""})
                </span>
                <span className="text-app-text font-medium">{currency}{cartTotal.toFixed(0)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-app-text-light flex items-center gap-1.5">
                  <TruckIcon className="size-3.5 text-app-green-accent" strokeWidth={1.75} />
                  Delivery
                </span>
                <span className={deliveryFee === 0 ? "text-app-success font-semibold" : "text-app-text font-medium"}>
                  {deliveryFee === 0 ? "Free" : `${currency}${deliveryFee}`}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-app-text-light">Tax (5%)</span>
                <span className="text-app-text font-medium">{currency}{tax}</span>
              </div>
              <div className="flex justify-between pt-3 border-t border-app-border">
                <span className="text-[14px] font-bold text-app-text">Total</span>
                <span className="text-[16px] font-bold text-app-green">
                  {currency}{total.toFixed(0)}
                </span>
              </div>
            </div>

            {/* Free delivery note */}
            {deliveryFee > 0 && (
              <p className="text-[11.5px] text-app-text-faint mt-3 pt-3 border-t border-app-border text-center">
                Add{" "}
                <span className="font-semibold text-app-green">
                  {currency}{(400 - cartTotal).toFixed(0)}
                </span>{" "}
                more for free delivery
              </p>
            )}

          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout