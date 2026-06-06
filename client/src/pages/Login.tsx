import { useState } from "react"
import { heroSectionData } from "../assets/assets"
import { Link } from "react-router-dom"
import { Loader2Icon, LockIcon, MailIcon, ShoppingBag, UserIcon } from "lucide-react"

const Login = () => {
  const [isLoginState, setIsLoginState] = useState(true)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => (window.location.href = "/"), 1000)
  }

  return (
    <div className="min-h-screen flex">

      {/* Left Panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-app-green relative flex-col justify-end p-10 overflow-hidden">
        <div className="absolute w-44 h-56 rounded-[50%_0] bg-white/[0.04] -top-10 -left-10 -rotate-12" />
        <div className="absolute w-52 h-64 rounded-[50%_0] bg-white/[0.04] top-16 -right-14 rotate-[30deg]" />
        <div className="absolute w-32 h-40 rounded-[50%_0] bg-white/[0.03] bottom-20 left-5 -rotate-6" />
        <div className="absolute w-24 h-28 rounded-[50%_0] bg-white/[0.04] -bottom-4 right-8 rotate-12" />
        <img
          src={heroSectionData.hero_image}
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-10"
        />
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-10">
            <ShoppingBag className="size-7 text-app-success" />
            <span className="text-[18px] font-medium text-white tracking-wide">Cartify</span>
          </div>
          <p className="font-serif text-[26px] text-white leading-snug italic mb-3">
            "Fresh from the farm,<br />straight to your door."
          </p>
          <p className="text-[12.5px] text-white/40 font-light leading-relaxed">
            Organic produce & groceries<br />delivered fresh, every day.
          </p>
          <div className="flex gap-5 mt-7 items-center">
            <div>
              <p className="text-[18px] font-semibold text-app-success">12k+</p>
              <p className="text-[11px] text-white/40 mt-1 font-light">Happy Customers</p>
            </div>
            <div className="w-px h-8 bg-white/10" />
            <div>
              <p className="text-[18px] font-semibold text-app-success">500+</p>
              <p className="text-[11px] text-white/40 mt-1 font-light">Organic Products</p>
            </div>
            <div className="w-px h-8 bg-white/10" />
            <div>
              <p className="text-[18px] font-semibold text-app-success">2hr</p>
              <p className="text-[11px] text-white/40 mt-1 font-light">Delivery</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-app-cream">
        <div className="w-full max-w-sm">
          <div className="mb-7">
            <h1 className="font-serif text-[22px] font-semibold text-app-text mb-1">
              {isLoginState ? "Welcome back" : "Create account"}
            </h1>
            <p className="text-[12.5px] text-app-text-light font-light">
              {isLoginState ? "Sign in to continue shopping fresh" : "Join Cartify for fresh deliveries"}
            </p>
          </div>

          {/* Tab switcher */}
          <div className="flex rounded-[10px] overflow-hidden border border-app-border mb-6">
            <button
              type="button"
              onClick={() => setIsLoginState(true)}
              className={`flex-1 py-2.5 text-[13px] font-medium transition-all ${
                isLoginState ? "bg-app-green text-white" : "bg-app-cream-dark text-app-text-light"
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => setIsLoginState(false)}
              className={`flex-1 py-2.5 text-[13px] font-medium transition-all ${
                !isLoginState ? "bg-app-green text-white" : "bg-app-cream-dark text-app-text-light"
              }`}
            >
              Create Account
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLoginState && (
              <label className="flex flex-col gap-1.5">
                <span className="text-[11px] font-medium text-app-text-light tracking-widest uppercase">Full Name</span>
                <div className="relative">
                  <UserIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 size-[15px] text-app-text-light/50" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="Your full name"
                    className="w-full pl-10 pr-4 py-[11px] text-[13.5px] bg-white rounded-[10px] border border-app-border focus:border-app-green text-app-text placeholder:text-app-text-light/40 transition-colors"
                  />
                </div>
              </label>
            )}

            <label className="flex flex-col gap-1.5">
              <span className="text-[11px] font-medium text-app-text-light tracking-widest uppercase">Email Address</span>
              <div className="relative">
                <MailIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 size-[15px] text-app-text-light/50" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-[11px] text-[13.5px] bg-white rounded-[10px] border border-app-border focus:border-app-green text-app-text placeholder:text-app-text-light/40 transition-colors"
                />
              </div>
            </label>

            <label className="flex flex-col gap-1.5">
              <span className="text-[11px] font-medium text-app-text-light tracking-widest uppercase">Password</span>
              <div className="relative">
                <LockIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 size-[15px] text-app-text-light/50" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-[11px] text-[13.5px] bg-white rounded-[10px] border border-app-border focus:border-app-green text-app-text placeholder:text-app-text-light/40 transition-colors"
                />
              </div>
            </label>

            {isLoginState ? (
              <div className="flex justify-end">
                <button type="button" className="text-[12px] text-app-green-lighter hover:text-app-green transition-colors">
                  Forgot password?
                </button>
              </div>
            ) : (
              <p className="text-[11.5px] text-app-text-light leading-relaxed">
                By creating an account you agree to our{" "}
                <Link to="/terms" className="text-app-green-lighter hover:underline">Terms of Service</Link>
                {" "}and{" "}
                <Link to="/privacy" className="text-app-green-lighter hover:underline">Privacy Policy</Link>.
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-app-green hover:bg-app-green-light text-white text-[14px] font-medium rounded-[10px] transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <Loader2Icon className="size-4 animate-spin" />
              ) : isLoginState ? "Sign In" : "Create Account"}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login