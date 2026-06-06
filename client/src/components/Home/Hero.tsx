import { ArrowRightIcon, LeafIcon, ShieldCheckIcon } from "lucide-react"
import { heroSectionData } from "../../assets/assets"
import { Link } from "react-router-dom"

const Hero = () => {
  return (
    <section className="relative overflow-hidden min-h-[560px] mb-10 rounded-3xl flex items-center">
      <img
        src={heroSectionData.hero_image}
        alt="Hero"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-app-green/95 via-app-green/80 to-app-green/10" />
      <div className="absolute -bottom-10 -left-10 w-52 h-52 rounded-[50%_0] bg-white/[0.03] rotate-12 pointer-events-none" />
      <div className="absolute top-10 left-[38%] w-36 h-44 rounded-[50%_0] bg-white/[0.02] -rotate-12 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="max-w-xl xl:pl-10">

          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-[11px] font-semibold text-app-success bg-app-success/10 border border-app-success/20 rounded-full mb-5 tracking-wide uppercase">
            <LeafIcon className="size-3" /> Farm-Fresh & Organic
          </span>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-[56px] text-white leading-[1.15] mb-5">
            Nourish your home with{" "}
            <span className="text-app-success italic">Earth's finest</span>
          </h1>

          <p className="text-[15px] text-white/60 leading-relaxed mb-8 max-w-md font-light">
            {heroSectionData.description}
          </p>

          <div className="flex items-center gap-4 mb-8">
            <div className="flex items-center gap-1.5 text-white/50 text-[12px]">
              <ShieldCheckIcon className="size-3.5 text-app-success" strokeWidth={1.5} />
              <span>100% Organic</span>
            </div>
            <div className="w-px h-3.5 bg-white/20" />
            <div className="flex items-center gap-1.5 text-white/50 text-[12px]">
              <LeafIcon className="size-3.5 text-app-success" strokeWidth={1.5} />
              <span>Pesticide-Free</span>
            </div>
            <div className="w-px h-3.5 bg-white/20" />
            <div className="flex items-center gap-1.5 text-white/50 text-[12px]">
              <span className="text-app-success font-semibold text-[13px]">2hr</span>
              <span>Delivery</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              to="/products"
              className="px-7 py-3 bg-app-green-light hover:bg-app-green-lighter text-white text-[14px] font-semibold rounded-full transition-colors flex items-center gap-2 active:scale-[0.98] border border-white/10"
            >
              Shop Now <ArrowRightIcon className="size-4" />
            </Link>
            <Link
              to="/products"
              className="px-7 py-3 bg-white/10 hover:bg-white/15 text-white text-[14px] font-semibold rounded-full transition-colors border border-white/20 active:scale-[0.98]"
            >
              Browse Categories
            </Link>
          </div>

        </div>
      </div>
    </section>
  )
}

export default Hero