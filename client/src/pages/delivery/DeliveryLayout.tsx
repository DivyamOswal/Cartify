import { Outlet, useNavigate } from "react-router-dom"
import { LogOutIcon, ShoppingBag, TruckIcon } from "lucide-react"
import { useEffect, useState } from "react"
import type { DeliveryPartner } from "../../types"
import { dummyDeliveryPartnerData } from "../../assets/assets"

export default function DeliveryLayout() {
  const navigate = useNavigate()
  const [partner, setPartner] = useState<DeliveryPartner | null>(null)

  useEffect(() => {
    setPartner(dummyDeliveryPartnerData[0] as DeliveryPartner)
  }, [])  // ✅ removed navigate from deps — it never changes

  const handleLogout = () => navigate("/delivery/login")

  if (!partner) return null

  return (
    <div className="min-h-screen bg-app-cream">

      {/* Header */}
      <header className="bg-white border-b border-app-border sticky top-0 z-40 shadow-[0_1px_12px_rgba(26,46,26,0.05)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 h-[60px] flex items-center justify-between gap-4">

          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="size-8 bg-app-green rounded-[8px] flex items-center justify-center shrink-0">
              <ShoppingBag size={15} className="text-white" strokeWidth={2.2} />
            </div>
            <div>
              <span className="text-[16px] font-semibold text-app-green tracking-tight">
                Cartify
              </span>
              <span className="text-[11px] text-app-text-faint font-light ml-1.5">
                Delivery
              </span>
            </div>
          </div>

          {/* Partner info + logout */}
          <div className="flex items-center gap-2">

            {/* Active status dot */}
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-[#86c75a]/10 border border-[#86c75a]/20 rounded-full">
              <span className="size-1.5 rounded-full bg-app-green-accent animate-pulse inline-block" />
              <span className="text-[11px] font-semibold text-[#3b6d11]">On Duty</span>
            </div>

            {/* Partner avatar + name */}
            <div className="flex items-center gap-2 pl-1 pr-2.5 py-1.5 rounded-xl hover:bg-app-cream transition-colors">
              <div className="size-7 rounded-[8px] bg-app-green-light flex items-center justify-center shrink-0">
                <span className="text-[12px] font-bold text-white">
                  {partner.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="hidden sm:block">
                <p className="text-[12.5px] font-semibold text-app-text leading-tight">
                  {partner.name}
                </p>
                <p className="text-[10px] text-app-text-faint leading-tight capitalize">
                  {partner.vehicleType}
                </p>
              </div>
            </div>

            {/* Divider */}
            <div className="w-px h-5 bg-app-border mx-1" />

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="size-8 flex items-center justify-center rounded-xl text-app-text-faint hover:text-app-error hover:bg-red-50 transition-colors"
              aria-label="Logout"
            >
              <LogOutIcon className="size-4" strokeWidth={1.75} />
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-7">
        <main className="min-w-0">
          <Outlet />
        </main>
      </div>

    </div>
  )
}