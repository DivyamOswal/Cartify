import { CheckIcon, Loader2Icon, MapPinIcon, PackageIcon, ShieldCheckIcon, TruckIcon } from "lucide-react"
import type { Address } from "../../types"

interface CheckoutReviewProps {
  address: Address
  items: any[]
  handlePlaceOrder: () => void
  loading: boolean
  total: number
}

export default function CheckoutReview({
  address,
  items,
  handlePlaceOrder,
  loading,
  total,
}: CheckoutReviewProps) {
  const currency = import.meta.env.VITE_CURRENCY_SYMBOL || "₹"

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  const deliveryFee = subtotal > 400 ? 0 : 75
  const tax = Math.round(subtotal * 0.05)

  return (
    <div className="bg-white border border-app-border rounded-2xl overflow-hidden animate-fade-in">

      {/* Header */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-app-border">
        <div className="size-8 bg-app-green rounded-[8px] flex items-center justify-center shrink-0">
          <CheckIcon size={14} className="text-white" strokeWidth={2.5} />
        </div>
        <div>
          <h2 className="text-[15px] font-semibold text-app-text leading-tight">
            Review Your Order
          </h2>
          <p className="text-[11px] text-app-text-light font-light leading-tight">
            Confirm everything looks right before placing
          </p>
        </div>
      </div>

      <div className="p-5 space-y-5">

        {/* Delivery address */}
        <div className="flex items-start gap-3 p-4 bg-app-cream border border-app-border rounded-xl">
          <div className="size-8 bg-app-green rounded-[8px] flex items-center justify-center shrink-0 mt-0.5">
            <MapPinIcon size={13} className="text-white" strokeWidth={2.2} />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
              <p className="text-[12px] font-bold text-app-text-light uppercase tracking-widest">
                Delivering to
              </p>
              {address.label && (
                <span className="text-[10px] font-semibold text-[#3b6d11] bg-[#86c75a]/15 border border-[#86c75a]/30 px-1.5 py-0.5 rounded-full">
                  {address.label}
                </span>
              )}
            </div>
            <p className="text-[13px] text-app-text-muted leading-snug">
              {address.address}, {address.city}, {address.state} – {address.zip}
            </p>
          </div>
        </div>

        {/* Items */}
        <div>
          <p className="text-[10.5px] font-bold text-app-text-light uppercase tracking-widest mb-3 flex items-center gap-2">
            <PackageIcon className="size-3.5 text-app-green-accent" strokeWidth={1.75} />
            {items.length} Item{items.length !== 1 ? "s" : ""}
          </p>

          <div className="space-y-2.5">
            {items.map((item) => (
              <div
                key={item.product.id}
                className="flex items-center gap-3 p-3 bg-app-cream rounded-xl border border-app-border"
              >
                {/* Image */}
                <div className="size-12 rounded-lg bg-white border border-app-border flex items-center justify-center shrink-0 overflow-hidden">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-full h-full object-contain p-1"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-semibold text-app-text truncate leading-snug">
                    {item.product.name}
                  </p>
                  <p className="text-[11px] text-app-text-faint mt-0.5">
                    {item.product.unit} · Qty {item.quantity}
                  </p>
                </div>

                {/* Price */}
                <span className="text-[13px] font-bold text-app-text shrink-0">
                  {currency}{(item.product.price * item.quantity).toFixed(0)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Price breakdown */}
        <div className="bg-app-cream border border-app-border rounded-xl p-4 space-y-2">
          <div className="flex justify-between text-[13px]">
            <span className="text-app-text-light">Subtotal</span>
            <span className="text-app-text font-medium">{currency}{subtotal.toFixed(0)}</span>
          </div>
          <div className="flex justify-between text-[13px]">
            <span className="text-app-text-light flex items-center gap-1.5">
              <TruckIcon className="size-3.5 text-app-green-accent" strokeWidth={1.75} />
              Delivery
            </span>
            <span className={deliveryFee === 0 ? "text-app-success font-semibold" : "text-app-text font-medium"}>
              {deliveryFee === 0 ? "Free" : `${currency}${deliveryFee}`}
            </span>
          </div>
          <div className="flex justify-between text-[13px]">
            <span className="text-app-text-light">Tax (5%)</span>
            <span className="text-app-text font-medium">{currency}{tax}</span>
          </div>
          <div className="flex justify-between text-[14px] font-bold border-t border-app-border pt-2.5 mt-1">
            <span className="text-app-text">Total</span>
            <span className="text-app-green text-[16px]">{currency}{total.toFixed(0)}</span>
          </div>
        </div>

        {/* Security note */}
        <div className="flex items-center gap-2 px-4 py-3 bg-app-cream rounded-xl border border-app-border">
          <ShieldCheckIcon className="size-4 text-app-green-accent shrink-0" strokeWidth={1.75} />
          <p className="text-[11.5px] text-app-text-muted font-light">
            Orders are protected by our secure checkout and easy return policy.
          </p>
        </div>

        <div className="h-px bg-app-border" />

        {/* Place order CTA */}
        <button
          onClick={handlePlaceOrder}
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 py-3.5 bg-app-green hover:bg-app-green-lighter text-white text-[14px] font-bold rounded-xl transition-colors disabled:opacity-50 active:scale-[0.98]"
        >
          {loading ? (
            <>
              <Loader2Icon className="size-4 animate-spin" />
              Placing Order…
            </>
          ) : (
            <>
              <CheckIcon className="size-4" strokeWidth={2.5} />
              Place Order · {currency}{total.toFixed(0)}
            </>
          )}
        </button>

      </div>
    </div>
  )
}