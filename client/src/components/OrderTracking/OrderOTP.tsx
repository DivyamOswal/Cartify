import { KeyRoundIcon, ShieldCheckIcon } from "lucide-react"

export default function OrderOTP({ order }: { order: any }) {
  const showOtp = order.deliveryOtp &&
    ["Assigned", "Packed", "Out for Delivery"].includes(order.status)

  if (!showOtp) return null

  return (
    <div className="bg-app-green border border-app-green-light rounded-2xl overflow-hidden">

      {/* Top shimmer line */}
      <div className="h-px bg-gradient-to-r from-transparent via-app-green-accent/40 to-transparent" />

      <div className="p-5">

        {/* Header */}
        <div className="flex items-start justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="size-9 rounded-[10px] bg-white/10 border border-white/10 flex items-center justify-center shrink-0">
              <KeyRoundIcon className="size-4 text-white" strokeWidth={1.75} />
            </div>
            <div>
              <h3 className="text-[14px] font-semibold text-white leading-tight">
                Delivery OTP
              </h3>
              <p className="text-[11.5px] text-white/50 font-light mt-0.5">
                Share this with your delivery partner
              </p>
            </div>
          </div>

          {/* Security badge */}
          <div className="flex items-center gap-1 px-2.5 py-1 bg-white/10 border border-white/10 rounded-full">
            <ShieldCheckIcon className="size-3 text-white" strokeWidth={2} />
            <span className="text-[10px] font-semibold text-white">Secure</span>
          </div>
        </div>

        {/* OTP digits */}
        <div className="flex items-center gap-2 mb-5">
          {order.deliveryOtp.split("").map((digit: string, i: number) => (
            <div
              key={i}
              className="flex-1 h-14 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center text-[24px] font-bold text-white font-mono tracking-wider"
            >
              {digit}
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="h-px bg-white/10 mb-4" />

        {/* Warning note */}
        <div className="flex items-start gap-2">
          <ShieldCheckIcon className="size-3.5 text-app-green-accent shrink-0 mt-0.5" strokeWidth={2} />
          <p className="text-[11.5px] text-white/40 font-light leading-snug">
            Only share this OTP when your delivery partner is at your door. Do not share over call or message.
          </p>
        </div>

      </div>
    </div>
  )
}