import { useEffect, useState } from "react"
import { ShoppingBagIcon, ZapIcon } from "lucide-react"
import type { Product } from "../types"
import Loading from "../components/Loading"
import ProductCard from "../components/ProductCard"
import api from "../config/api"
import toast from "react-hot-toast"

const FlashDeals = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [timeLeft, setTimeLeft] = useState({ h: 3, m: 59, s: 59 })

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.s > 0) return { ...prev, s: prev.s - 1 }
        if (prev.m > 0) return { ...prev, m: prev.m - 1, s: 59 }
        if (prev.h > 0) return { h: prev.h - 1, m: 59, s: 59 }
        clearInterval(timer)
        return prev
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    api.get("/products/flash-deals").then((res)=> setProducts(res.data.products)).catch((error: any)=> toast.error(error.response.data.products)).catch((error: any)=> toast.error(error.response.data.message || error?.message)).finally(()=> setLoading(false))
  }, [])

  const pad = (n: number) => String(n).padStart(2, "0")

  return (
    <div className="min-h-screen bg-app-cream">

      {/* Hero Banner */}
      <div className="relative bg-app-green overflow-hidden">

        {/* Leaf blobs */}
        <div className="absolute -top-8 -left-8 w-44 h-56 rounded-[50%_0] bg-white/[0.03] rotate-[-20deg] pointer-events-none" />
        <div className="absolute top-4 right-20 w-36 h-44 rounded-[50%_0] bg-white/[0.03] rotate-[25deg] pointer-events-none" />
        <div className="absolute -bottom-6 left-1/3 w-28 h-36 rounded-[50%_0] bg-white/[0.02] rotate-[-10deg] pointer-events-none" />

        {/* Shimmer */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-app-green-accent/30 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 text-center">

          {/* Eyebrow */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-app-orange/20 border border-app-orange/30 rounded-full mb-5">
            <ZapIcon className="size-3 text-app-orange fill-app-orange" />
            <span className="text-[11px] font-bold text-app-orange tracking-widest uppercase">
              Limited Time Only
            </span>
            <ZapIcon className="size-3 text-app-orange fill-app-orange" />
          </div>

          {/* Heading */}
          <h1 className="font-serif text-4xl sm:text-5xl text-white leading-tight mb-3">
            Flash <span className="text-app-orange italic">Deals</span>
          </h1>
          <p className="text-[14px] text-white/50 font-light max-w-md mx-auto mb-8">
            Exclusive organic product deals for a limited time. Grab yours before they're gone!
          </p>

          {/* Countdown */}
          <div className="inline-flex items-center gap-3">
            <span className="text-[12px] text-white/40 font-medium">Ends in</span>
            {[
              { val: timeLeft.h, label: "hrs"  },
              { val: timeLeft.m, label: "min"  },
              { val: timeLeft.s, label: "sec"  },
            ].map((unit, i) => (
              <span key={i} className="flex items-center gap-3">
                <span className="flex flex-col items-center">
                  <span className="size-12 bg-white/10 border border-white/10 rounded-xl flex items-center justify-center text-[20px] font-bold text-white tabular-nums">
                    {pad(unit.val)}
                  </span>
                  <span className="text-[9px] text-white/30 font-medium mt-1 uppercase tracking-widest">
                    {unit.label}
                  </span>
                </span>
                {i < 2 && (
                  <span className="text-[18px] font-bold text-white/30 -mt-3">:</span>
                )}
              </span>
            ))}
          </div>

          {/* Stats strip */}
          <div className="flex items-center justify-center gap-6 mt-8">
            <div className="flex items-center gap-1.5 text-white/40 text-[12px]">
              <span className="size-1.5 rounded-full bg-app-green-accent" />
              {products.length} deals active
            </div>
            <div className="w-px h-3.5 bg-white/15" />
            <div className="flex items-center gap-1.5 text-white/40 text-[12px]">
              <span className="size-1.5 rounded-full bg-app-orange" />
              Up to 50% off
            </div>
          </div>
        </div>
      </div>

      {/* Products */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {loading ? (
          <Loading />
        ) : products.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="size-16 rounded-2xl bg-white border border-app-border flex items-center justify-center mb-4 shadow-sm">
              <ZapIcon className="size-7 text-app-text-faint" strokeWidth={1.5} />
            </div>
            <h3 className="font-serif text-xl text-app-text mb-2">No deals right now</h3>
            <p className="text-[13px] text-app-text-light font-light">
              Check back soon for amazing offers!
            </p>
          </div>
        ) : (
          <>
            {/* Section header */}
            <div className="flex items-end justify-between mb-6">
              <div>
                <p className="text-[11px] font-semibold text-app-green-accent tracking-widest uppercase mb-1.5">
                  Today's Picks
                </p>
                <h2 className="font-serif text-2xl sm:text-3xl text-app-text leading-tight">
                  All Flash Deals
                </h2>
                <p className="text-[13px] text-app-text-light mt-1 font-light">
                  {products.length} product{products.length !== 1 ? "s" : ""} on sale
                </p>
              </div>
              <div className="hidden sm:flex items-center gap-1.5 text-[12px] text-app-text-faint">
                <ShoppingBagIcon className="size-3.5" strokeWidth={1.5} />
                Free delivery over ₹400
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3 xl:gap-4">
              {products.map((product) =>
                product.stock > 0 && (
                  <ProductCard key={product.id} product={product} />
                )
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default FlashDeals