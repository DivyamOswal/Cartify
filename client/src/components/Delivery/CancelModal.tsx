import { AlertTriangleIcon, Loader2Icon, XIcon } from "lucide-react"

interface CancelModalProps {
  setCancelModal: (cancelModal: string | null) => void
  cancelReason: string
  setCancelReason: (cancelReason: string) => void
  handleCancel: () => void
  submitting: boolean
}

export default function CancelModal({
  setCancelModal,
  cancelReason,
  setCancelReason,
  handleCancel,
  submitting,
}: CancelModalProps) {

  const reasons = [
    "Changed my mind",
    "Ordered by mistake",
    "Found a better price",
    "Delivery time too long",
    "Other",
  ]

  const handleClose = () => {
    setCancelModal(null)
    setCancelReason("")
  }

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
              <div className="size-8 bg-red-50 border border-red-200 rounded-[8px] flex items-center justify-center shrink-0">
                <AlertTriangleIcon className="size-4 text-red-500" strokeWidth={2} />
              </div>
              <div>
                <h3 className="text-[14.5px] font-semibold text-app-text leading-tight">
                  Cancel Order
                </h3>
                <p className="text-[11px] text-app-text-light font-light leading-tight">
                  This action cannot be undone
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

          <div className="p-5 space-y-4">

            {/* Quick reason pills */}
            <div>
              <p className="text-[10.5px] font-bold text-app-text-light uppercase tracking-widest mb-2.5">
                Reason for cancellation
              </p>
              <div className="flex flex-wrap gap-1.5">
                {reasons.map((reason) => (
                  <button
                    key={reason}
                    type="button"
                    onClick={() => setCancelReason(reason)}
                    className={`text-[11.5px] font-medium px-2.5 py-1 rounded-lg border transition-all
                      ${cancelReason === reason
                        ? "bg-red-500 text-white border-red-500"
                        : "bg-app-cream border-app-cream-darker text-app-text-muted hover:border-red-300 hover:text-red-500"
                      }`}
                  >
                    {reason}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom reason textarea */}
            <textarea
              value={cancelReason}
              onChange={(e) => setCancelReason(e.target.value)}
              rows={3}
              placeholder="Or describe your reason here…"
              className="w-full px-4 py-3 text-[13px] bg-app-cream border-[1.5px] border-app-cream-darker rounded-xl focus:border-red-300 focus:bg-white text-app-text placeholder:text-app-text-faint outline-none resize-none transition-all"
            />

            {/* Warning note */}
            <div className="flex items-start gap-2 px-3.5 py-3 bg-red-50 border border-red-200 rounded-xl">
              <AlertTriangleIcon className="size-3.5 text-red-400 shrink-0 mt-0.5" strokeWidth={2} />
              <p className="text-[11.5px] text-red-500 font-light leading-snug">
                Cancelling will notify the delivery partner and refund any payment within 3–5 business days.
              </p>
            </div>

            <div className="h-px bg-app-border" />

            {/* Actions */}
            <div className="flex gap-2.5">
              <button
                onClick={handleClose}
                className="flex-1 py-2.5 text-[13px] font-medium text-app-text-muted bg-app-cream hover:bg-app-cream-dark border border-app-border rounded-xl transition-colors"
              >
                Go Back
              </button>
              <button
                onClick={handleCancel}
                disabled={submitting || !cancelReason.trim()}
                className="flex-1 py-2.5 text-[13px] font-medium text-white bg-red-500 hover:bg-red-600 rounded-xl transition-colors disabled:opacity-50 flex items-center justify-center gap-1.5 active:scale-[0.98]"
              >
                {submitting ? (
                  <>
                    <Loader2Icon className="size-3.5 animate-spin" />
                    Cancelling…
                  </>
                ) : (
                  "Confirm Cancel"
                )}
              </button>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}