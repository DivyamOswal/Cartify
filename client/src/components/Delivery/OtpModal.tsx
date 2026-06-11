import { KeyRoundIcon, Loader2Icon, ShieldCheckIcon, XIcon } from "lucide-react"

interface OtpModalProps {
  setOtpModal: (otpModal: string | null) => void
  otp: string
  setOtp: (otp: string) => void
  handleComplete: () => void
  submitting: boolean
}

export default function OtpModal({
  setOtpModal,
  otp,
  setOtp,
  handleComplete,
  submitting,
}: OtpModalProps) {

  const handleClose = () => {
    setOtpModal(null)
    setOtp("")
  }

  // Split OTP into individual digit boxes
  const digits = otp.padEnd(6, " ").split("")

  return (
    <>
      {/* Overlay */}
      <div
        onClick={handleClose}
        className="fixed inset-0 bg-black/30 z-50 backdrop-blur-[2px]"
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div className="bg-white rounded-3xl w-full max-w-sm shadow-[0_8px_40px_rgba(0,0,0,0.12)] animate-fade-in pointer-events-auto overflow-hidden">

          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-app-border">
            <div className="flex items-center gap-3">
              <div className="size-8 bg-app-green rounded-[8px] flex items-center justify-center shrink-0">
                <KeyRoundIcon size={14} className="text-white" strokeWidth={2} />
              </div>
              <div>
                <h3 className="text-[14.5px] font-semibold text-app-text leading-tight">
                  Enter Delivery OTP
                </h3>
                <p className="text-[11px] text-app-text-light font-light leading-tight">
                  Ask the customer for their 6-digit code
                </p>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="size-8 flex items-center justify-center rounded-xl hover:bg-app-cream transition-colors"
              aria-label="Close"
            >
              <XIcon className="size-4 text-app-text-muted" />
            </button>
          </div>

          <div className="p-5 space-y-5">

            {/* Individual digit boxes */}
            <div>
              <p className="text-[10.5px] font-bold text-app-text-light uppercase tracking-widest mb-3 text-center">
                6-Digit OTP
              </p>
              <div className="flex items-center gap-2 justify-center">
                {digits.map((digit, i) => (
                  <div
                    key={i}
                    className={`w-10 h-12 rounded-xl border-[1.5px] flex items-center justify-center text-[20px] font-bold font-mono transition-all
                      ${digit.trim()
                        ? "border-app-green bg-[#86c75a]/5 text-app-text"
                        : "border-app-cream-darker bg-app-cream text-app-text-faint"
                      }`}
                  >
                    {digit.trim() || "·"}
                  </div>
                ))}
              </div>

              {/* Hidden real input overlapping the boxes */}
              <input
                type="text"
                inputMode="numeric"
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                className="sr-only"
                autoFocus
                aria-label="Enter OTP"
              />

              {/* Tap to type hint */}
              <button
                type="button"
                onClick={() => {
                  const input = document.querySelector<HTMLInputElement>('input[aria-label="Enter OTP"]')
                  input?.focus()
                }}
                className="block w-full text-center text-[11.5px] text-app-text-faint mt-2.5 hover:text-app-text transition-colors"
              >
                Tap here to enter OTP
              </button>
            </div>

            {/* Progress dots */}
            <div className="flex items-center justify-center gap-1.5">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className={`rounded-full transition-all duration-200 ${
                    i < otp.length
                      ? "size-2 bg-app-green"
                      : "size-1.5 bg-app-cream-darker"
                  }`}
                />
              ))}
            </div>

            {/* Security note */}
            <div className="flex items-center gap-2 px-3.5 py-3 bg-app-cream rounded-xl border border-app-border">
              <ShieldCheckIcon className="size-4 text-app-green-accent shrink-0" strokeWidth={1.75} />
              <p className="text-[11.5px] text-app-text-muted font-light leading-snug">
                Only confirm delivery after the customer shows you their OTP.
              </p>
            </div>

            <div className="h-px bg-app-border" />

            {/* Actions */}
            <div className="flex gap-2.5">
              <button
                onClick={handleClose}
                className="flex-1 py-2.5 text-[13px] font-medium text-app-text-muted bg-app-cream hover:bg-app-cream-dark border border-app-border rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleComplete}
                disabled={otp.length !== 6 || submitting}
                className="flex-1 py-2.5 text-[13px] font-semibold text-white bg-app-green hover:bg-app-green-lighter rounded-xl transition-colors disabled:opacity-50 flex items-center justify-center gap-1.5 active:scale-[0.98]"
              >
                {submitting ? (
                  <>
                    <Loader2Icon className="size-3.5 animate-spin" />
                    Verifying…
                  </>
                ) : (
                  "Confirm Delivery"
                )}
              </button>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}