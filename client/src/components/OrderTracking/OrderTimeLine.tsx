import {
  CheckIcon,
  ClockIcon,
  MapPinIcon,
  PackageIcon,
  TruckIcon,
  UserCheckIcon,
} from "lucide-react"

const allStatuses = [
  { key: "Placed",            label: "Order Placed",       icon: ClockIcon     },
  { key: "Confirmed",         label: "Order Confirmed",    icon: CheckIcon     },
  { key: "Assigned",          label: "Rider Assigned",     icon: UserCheckIcon },
  { key: "Packed",            label: "Order Packed",       icon: PackageIcon   },
  { key: "Out for Delivery",  label: "Out for Delivery",   icon: TruckIcon     },
  { key: "Delivered",         label: "Delivered",          icon: MapPinIcon    },
]

export default function OrderTimeLine({ order }: { order: any }) {
  const currentIdx = allStatuses.findIndex((s) => s.key === order.status)
  const isCancelled = order.status === "Cancelled"

  return (
    <div className="bg-white border border-app-border rounded-2xl p-5">

      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <p className="text-[10.5px] font-bold text-app-text-light uppercase tracking-widest mb-0.5">
            Progress
          </p>
          <h2 className="text-[14px] font-semibold text-app-text">
            Delivery Timeline
          </h2>
        </div>

        {/* Step counter */}
        {!isCancelled && (
          <span className="text-[11.5px] font-semibold text-app-green bg-[#86c75a]/10 border border-[#86c75a]/20 px-2.5 py-1 rounded-full">
            {Math.min(currentIdx + 1, allStatuses.length)} / {allStatuses.length}
          </span>
        )}

        {isCancelled && (
          <span className="text-[11.5px] font-semibold text-app-error bg-red-50 border border-red-200 px-2.5 py-1 rounded-full">
            Cancelled
          </span>
        )}
      </div>

      {/* Timeline */}
      <div className="space-y-0">
        {allStatuses.map((step, i) => {
          const Icon = step.icon
          const isCompleted = !isCancelled && i <= currentIdx
          const isCurrent   = !isCancelled && i === currentIdx
          const isLast      = i === allStatuses.length - 1

          const historyEntry = order.statusHistory?.find(
            (h: any) => h.status === step.key
          )

          return (
            <div key={step.key} className="flex gap-3.5">

              {/* Icon + connector line */}
              <div className="flex flex-col items-center shrink-0">
                <div
                  className={`size-8 rounded-[8px] flex items-center justify-center shrink-0 transition-all
                    ${isCompleted
                      ? isCurrent
                        ? "bg-app-green text-white shadow-[0_0_0_4px_rgba(45,74,45,0.12)]"
                        : "bg-app-green text-white"
                      : "bg-app-cream border border-app-border text-app-text-faint"
                    }`}
                >
                  {isCompleted && !isCurrent
                    ? <CheckIcon className="size-3.5" strokeWidth={2.5} />
                    : <Icon className="size-3.5" strokeWidth={isCurrent ? 2.5 : 1.75} />
                  }
                </div>

                {/* Connector */}
                {!isLast && (
                  <div
                    className={`w-px flex-1 my-1 min-h-[28px] rounded-full transition-colors
                      ${i < currentIdx && !isCancelled
                        ? "bg-app-green"
                        : "bg-app-border"
                      }`}
                  />
                )}
              </div>

              {/* Content */}
              <div className={`pb-5 flex-1 min-w-0 ${isLast ? "pb-0" : ""}`}>
                <div className="flex items-start justify-between gap-2">
                  <p
                    className={`text-[13px] font-semibold leading-snug
                      ${isCompleted ? "text-app-text" : "text-app-text-faint"}`}
                  >
                    {step.label}
                  </p>
                  {isCurrent && !isCancelled && (
                    <span className="shrink-0 flex items-center gap-1 text-[9.5px] font-bold text-app-green-accent bg-[#86c75a]/10 border border-[#86c75a]/20 px-2 py-0.5 rounded-full">
                      <span className="size-1.5 rounded-full bg-app-green-accent animate-pulse inline-block" />
                      Now
                    </span>
                  )}
                </div>

                {historyEntry ? (
                  <p className="text-[11px] text-app-text-faint mt-0.5">
                    {new Date(historyEntry.timestamp).toLocaleString("en-IN", {
                      day: "numeric",
                      month: "short",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                    {historyEntry.note && (
                      <span className="text-app-text-light"> · {historyEntry.note}</span>
                    )}
                  </p>
                ) : (
                  !isCompleted && (
                    <p className="text-[11px] text-app-text-faint mt-0.5">Pending</p>
                  )
                )}
              </div>

            </div>
          )
        })}
      </div>

    </div>
  )
}