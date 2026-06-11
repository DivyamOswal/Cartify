import { useState } from "react"
import { LockIcon, Loader2Icon, MailIcon, ShoppingBag, TruckIcon } from "lucide-react"
import { heroSectionData } from "../../assets/assets"

export default function DeliveryLogin() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => { // ✅ FormEvent not SubmitEvent
    e.preventDefault()
  }

  return (
    <div className="min-h-screen flex">

      {/* Left Panel — dark green matching Login */}
      <div className="hidden lg:flex lg:w-1/2 bg-app-green relative flex-col justify-end p-10 overflow-hidden">

        {/* Leaf blobs */}
        <div className="absolute w-44 h-56 rounded-[50%_0] bg-white/[0.04] -top-10 -left-10 -rotate-12 pointer-events-none" />
        <div className="absolute w-52 h-64 rounded-[50%_0] bg-white/[0.04] top-16 -right-14 rotate-[30deg] pointer-events-none" />
        <div className="absolute w-32 h-40 rounded-[50%_0] bg-white/[0.03] bottom-20 left-5 -rotate-6 pointer-events-none" />
        <div className="absolute w-24 h-28 rounded-[50%_0] bg-white/[0.04] -bottom-4 right-8 rotate-12 pointer-events-none" />

        {/* Shimmer */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-app-green-accent/30 to-transparent" />

        <img
          src={heroSectionData.hero_image}
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-10"
        />

        <div className="relative z-10">
          {/* Logo */}
          <div className="flex items-center gap-2.5 mb-10">
            <div className="size-8 bg-white/10 rounded-[8px] flex items-center justify-center shrink-0">
              <ShoppingBag size={15} className="text-white" strokeWidth={2.2} />
            </div>
            <span className="text-[18px] font-semibold text-white tracking-tight">
              Cartify
            </span>
          </div>

          {/* Tagline */}
          <p className="font-serif text-[26px] text-white leading-snug italic mb-3">
            "Deliver smiles,<br />one order at a time."
          </p>
          <p className="text-[12.5px] text-white/40 font-light leading-relaxed">
            Partner portal for delivery fleet<br />management and order tracking.
          </p>

          {/* Stats */}
          <div className="flex gap-5 mt-7 items-center">
            <div>
              <p className="text-[18px] font-semibold text-app-green-accent">500+</p>
              <p className="text-[11px] text-white/40 mt-1 font-light">Orders Daily</p>
            </div>
            <div className="w-px h-8 bg-white/10" />
            <div>
              <p className="text-[18px] font-semibold text-app-green-accent">2hr</p>
              <p className="text-[11px] text-white/40 mt-1 font-light">Avg Delivery</p>
            </div>
            <div className="w-px h-8 bg-white/10" />
            <div>
              <p className="text-[18px] font-semibold text-app-green-accent">4.9★</p>
              <p className="text-[11px] text-white/40 mt-1 font-light">Partner Rating</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-app-cream">
        <div className="w-full max-w-sm">

          {/* Header */}
          <div className="mb-7">
            <div className="flex items-center gap-2 mb-5">
              <div className="size-9 bg-app-green rounded-[10px] flex items-center justify-center shrink-0">
                <TruckIcon size={16} className="text-white" strokeWidth={2} />
              </div>
              <div>
                <p className="text-[14px] font-semibold text-app-text leading-tight">
                  Delivery Partner Portal
                </p>
                <p className="text-[10.5px] text-app-text-faint leading-tight">
                  Cartify Fleet Management
                </p>
              </div>
            </div>
            <h1 className="font-serif text-[22px] font-semibold text-app-text mb-1">
              Welcome back
            </h1>
            <p className="text-[12.5px] text-app-text-light font-light">
              Sign in to manage your deliveries
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Email */}
            <label className="flex flex-col gap-1.5">
              <span className="text-[11px] font-bold text-app-text-light uppercase tracking-widest">
                Email Address
              </span>
              <div className="relative">
                <MailIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 size-[15px] text-app-text-faint pointer-events-none" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="partner@example.com"
                  className="w-full pl-10 pr-4 py-[11px] text-[13.5px] bg-white border-[1.5px] border-app-cream-darker rounded-[10px] focus:border-app-green-light text-app-text placeholder:text-app-text-faint outline-none transition-colors"
                />
              </div>
            </label>

            {/* Password */}
            <label className="flex flex-col gap-1.5">
              <span className="text-[11px] font-bold text-app-text-light uppercase tracking-widest">
                Password
              </span>
              <div className="relative">
                <LockIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 size-[15px] text-app-text-faint pointer-events-none" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-[11px] text-[13.5px] bg-white border-[1.5px] border-app-cream-darker rounded-[10px] focus:border-app-green-light text-app-text placeholder:text-app-text-faint outline-none transition-colors"
                />
              </div>
            </label>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-app-green hover:bg-app-green-lighter text-white text-[14px] font-semibold rounded-[10px] transition-colors disabled:opacity-50 flex items-center justify-center gap-2 active:scale-[0.98] mt-1"
            >
              {loading
                ? <><Loader2Icon className="size-4 animate-spin" /> Signing in…</>
                : "Sign In"
              }
            </button>
          </form>

          {/* Footer note */}
          <p className="text-[11.5px] text-app-text-faint text-center mt-6 leading-relaxed">
            Partner credentials are provided by your<br />fleet administrator.
          </p>

        </div>
      </div>
    </div>
  )
}