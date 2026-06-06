import { TruckIcon, XIcon, ZapIcon, LeafIcon } from 'lucide-react'
import { useState } from 'react'

const Banner = () => {
  const [bannerVisible, setBannerVisible] = useState(() => {
    return sessionStorage.getItem('banner_dismissed') !== 'true'
  })

  const dismissBanner = () => {
    setBannerVisible(false)
    sessionStorage.setItem('banner_dismissed', 'true')
  }

  return (
    <>
      {bannerVisible && (
        <div className="relative overflow-hidden bg-app-green text-white text-xs sm:text-sm">
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-app-success/30 to-transparent" />
          <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-white/5 blur-xl pointer-events-none" />
          <div className="absolute right-16 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/5 blur-xl pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-center gap-2 sm:gap-6 pr-8">
            <div className="flex items-center gap-1.5">
              <TruckIcon className="size-3.5 shrink-0 text-app-success" />
              <span className="font-medium text-white/90">
                Free delivery on orders above{' '}
                <span className="text-app-success font-semibold">₹400</span>
              </span>
            </div>
            <span className="hidden sm:inline text-white/20 select-none">·</span>
            <div className="hidden sm:flex items-center gap-1.5">
              <ZapIcon className="size-3.5 shrink-0 fill-yellow-400 text-yellow-400" />
              <span className="text-white/70">Farm-fresh produce delivered daily</span>
            </div>
            <span className="hidden md:inline text-white/20 select-none">·</span>
            <div className="hidden md:flex items-center gap-1.5">
              <LeafIcon className="size-3.5 shrink-0 text-app-success" />
              <span className="text-white/70">100% organic & pesticide-free</span>
            </div>
          </div>

          <button
            onClick={dismissBanner}
            aria-label="Dismiss banner"
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-colors"
          >
            <XIcon className="size-3.5" />
          </button>
        </div>
      )}
    </>
  )
}

export default Banner