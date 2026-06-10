import { BanknoteIcon, CheckIcon, ChevronRightIcon, CreditCardIcon, ShieldCheckIcon } from "lucide-react"
import type { Dispatch, SetStateAction } from "react"

interface CheckoutPaymentProps {
  setStep: Dispatch<SetStateAction<string>>
  paymentMethod: string
  setPaymentMethod: Dispatch<SetStateAction<string>>
}

const paymentMethods = [
  {
    value: "card",
    label: "Credit / Debit Card",
    desc: "Pay securely with Visa, Mastercard, or UPI",
    icon: CreditCardIcon,
  },
  {
    value: "cash",
    label: "Cash on Delivery",
    desc: "Pay in cash when your order arrives",
    icon: BanknoteIcon,
  },
]

export default function CheckoutPayment({
  setStep,
  paymentMethod,
  setPaymentMethod,
}: CheckoutPaymentProps) {
  return (
    <div className="bg-white border border-app-border rounded-2xl overflow-hidden animate-fade-in">

      {/* Header */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-app-border">
        <div className="size-8 bg-app-green rounded-[8px] flex items-center justify-center shrink-0">
          <CreditCardIcon size={14} className="text-white" strokeWidth={2.2} />
        </div>
        <div>
          <h2 className="text-[15px] font-semibold text-app-text leading-tight">
            Payment Method
          </h2>
          <p className="text-[11px] text-app-text-light font-light leading-tight">
            Choose how you'd like to pay
          </p>
        </div>
      </div>

      <div className="p-5 space-y-5">

        {/* Payment options */}
        <div>
          <p className="text-[10.5px] font-bold text-app-text-light uppercase tracking-widest mb-3">
            Select Payment
          </p>
          <div className="space-y-2.5">
            {paymentMethods.map((method) => {
              const Icon = method.icon
              const selected = paymentMethod === method.value
              return (
                <label
                  key={method.value}
                  className={`flex items-center gap-4 p-4 rounded-xl border-[1.5px] cursor-pointer transition-all
                    ${selected
                      ? "border-app-green bg-[#86c75a]/5 shadow-[0_0_0_1px_rgba(45,74,45,0.08)]"
                      : "border-app-border hover:border-app-cream-darker hover:bg-app-cream"
                    }`}
                >
                  {/* Hidden radio */}
                  <input
                    type="radio"
                    name="payment"
                    value={method.value}
                    checked={selected}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="sr-only"
                  />

                  {/* Icon tile */}
                  <div className={`size-9 rounded-[10px] flex items-center justify-center shrink-0 transition-all
                    ${selected ? "bg-app-green" : "bg-app-cream border border-app-border"}`}
                  >
                    <Icon
                      className={`size-4 ${selected ? "text-white" : "text-app-text-faint"}`}
                      strokeWidth={1.75}
                    />
                  </div>

                  {/* Label */}
                  <div className="flex-1 min-w-0">
                    <p className={`text-[13.5px] font-semibold leading-tight ${selected ? "text-app-text" : "text-app-text-muted"}`}>
                      {method.label}
                    </p>
                    <p className="text-[11.5px] text-app-text-faint mt-0.5 font-light">
                      {method.desc}
                    </p>
                  </div>

                  {/* Checkmark */}
                  <div className={`size-5 rounded-full flex items-center justify-center shrink-0 border-[1.5px] transition-all
                    ${selected
                      ? "bg-app-green border-app-green"
                      : "border-app-cream-darker"
                    }`}
                  >
                    {selected && <CheckIcon className="size-3 text-white" strokeWidth={2.5} />}
                  </div>
                </label>
              )
            })}
          </div>
        </div>

        {/* Security note */}
        <div className="flex items-center gap-2 px-4 py-3 bg-app-cream rounded-xl border border-app-border">
          <ShieldCheckIcon className="size-4 text-app-green-accent shrink-0" strokeWidth={1.75} />
          <p className="text-[11.5px] text-app-text-muted font-light leading-snug">
            Your payment information is encrypted and processed securely.
          </p>
        </div>

        <div className="h-px bg-app-border" />

        {/* CTA */}
        <button
          onClick={() => { setStep("review"); window.scrollTo(0, 0) }}
          className="w-full flex items-center justify-center gap-2 py-3 bg-app-green hover:bg-app-green-lighter text-white text-[13.5px] font-semibold rounded-xl transition-colors active:scale-[0.98]"
        >
          Review Order
          <ChevronRightIcon className="size-4" />
        </button>

      </div>
    </div>
  )
}