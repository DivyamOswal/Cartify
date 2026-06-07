import { appPromoBannerData, assets } from "../../assets/assets"

const AppPromoBanner = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-14">
      <div className="relative bg-app-green rounded-3xl overflow-hidden">

        {/* Decorative leaf blobs same as login left panel */}
        <div className="absolute -top-10 -left-10 w-52 h-64 rounded-[50%_0] bg-white/[0.04] rotate-[-20deg] pointer-events-none" />
        <div className="absolute top-8 right-40 w-40 h-52 rounded-[50%_0] bg-white/[0.03] rotate-[25deg] pointer-events-none" />
        <div className="absolute -bottom-8 left-1/3 w-32 h-40 rounded-[50%_0] bg-white/[0.04] rotate-[-10deg] pointer-events-none" />

        {/* Shimmer line at top */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#86c75a]/30 to-transparent" />

        <div className="relative flex flex-col md:flex-row items-center justify-between gap-8 px-8 sm:px-12 xl:px-16 py-12">

          {/* Left Content */}
          <div className="text-center md:text-left max-w-lg">

            {/* Eyebrow */}
            <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-app-green-accent tracking-widest uppercase mb-4">
              <span className="size-1.5 rounded-full bg-app-green-accent inline-block" />
              Now Available on Mobile
            </span>

            {/* Heading */}
            <h2 className="font-serif text-3xl sm:text-4xl text-white leading-tight mb-3">
              {appPromoBannerData.title}
            </h2>

            {/* Description */}
            <p className="text-[14px] text-white/60 font-light leading-relaxed mb-8 max-w-md">
              {appPromoBannerData.description}
            </p>

            {/* Stats strip */}
            <div className="flex items-center gap-5 mb-8 justify-center md:justify-start">
              <div>
                <p className="text-[18px] text-white/40 font-bold text-app-green-accent leading-tight">4.9★</p>
                <p className="text-[11px] text-white/40 font-light mt-0.5">App Rating</p>
              </div>
              <div className="w-px h-8 bg-white/10" />
              <div>
                <p className="text-[18px] text-white/40 font-bold text-app-green-accent leading-tight">50k+</p>
                <p className="text-[11px] text-white/40 font-light mt-0.5">Downloads</p>
              </div>
              <div className="w-px h-8 bg-white/10" />
              <div>
                <p className="text-[18px] text-white/40 font-bold text-app-green-accent leading-tight">Free</p>
                <p className="text-[11px] text-white/40 font-light mt-0.5">No Charges</p>
              </div>
            </div>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-3 justify-center md:justify-start">

              {/* App Store */}
              <button className="flex items-center gap-2.5 px-5 py-3 bg-white text-app-green rounded-xl hover:bg-app-cream transition-colors active:scale-[0.98]">
                <svg className="size-5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                <div className="text-left">
                  <p className="text-[9px] font-medium text-app-text-muted leading-tight">Download on the</p>
                  <p className="text-[13px] font-bold text-app-text leading-tight">App Store</p>
                </div>
              </button>

              {/* Google Play */}
              <button className="flex items-center gap-2.5 px-5 py-3 bg-white/10 hover:bg-white/15 text-white border border-white/20 rounded-xl transition-colors active:scale-[0.98]">
                <svg className="size-5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3.18 23.76c.3.17.64.25 1 .22l.1-.06 11.05-11.06-2.35-2.35L3.18 23.76zm14.3-14.98L14.3 5.6 3.28.31c-.37-.2-.8-.2-1.14 0l10.72 10.72 4.62-2.25zM21.4 10.5l-3.04-1.73-2.6 2.6 2.6 2.6 3.07-1.74c.87-.5.87-1.76-.03-2.73zM3.28.31c-.34.18-.57.52-.57.93V22.9c0 .41.23.76.57.93L14.3 12.47 3.28.31z"/>
                </svg>
                <div className="text-left">
                  <p className="text-[9px] font-medium text-white/50 leading-tight">Get it on</p>
                  <p className="text-[13px] font-bold leading-tight">Google Play</p>
                </div>
              </button>
            </div>
          </div>
          {/* Right Image */}
          <div className="relative shrink-0 flex items-end justify-center">
            {/* Glow under image */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-12 bg-app-green-accent/10 rounded-full blur-2xl pointer-events-none" />
            <img
              src={assets.delivery_truck}
              alt="Cartify delivery"
              className="relative max-w-[240px] sm:max-w-[300px] xl:max-w-[340px] drop-shadow-lg xl:mr-6"
            />
          </div>

        </div>
      </div>
    </section>
  )
}

export default AppPromoBanner