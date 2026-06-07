import { MailIcon, SparklesIcon } from "lucide-react"

const Newsletter = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24 mb-20">
      <div className="relative bg-white border border-app-border rounded-3xl overflow-hidden shadow-[0_2px_20px_rgba(26,46,26,0.06)]">
        {/* Top accent line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-app-green-accent/40 to-transparent" />
        {/* Decorative blobs */}
        <div className="absolute -top-8 -left-8 w-36 h-44 rounded-[50%_0] bg-app-cream-dark/60 rotate-[-15deg] pointer-events-none" />
        <div className="absolute -bottom-8 -right-8 w-44 h-52 rounded-[50%_0] bg-app-cream-dark/60 rotate-[15deg] pointer-events-none" />
        <div className="absolute top-6 right-1/4 w-24 h-28 rounded-[50%_0] bg-app-green-accent/5 rotate-[30deg] pointer-events-none" />
        <div className="relative max-w-2xl mx-auto text-center px-6 py-14 sm:py-16">
          {/* Icon */}
          <div className="inline-flex items-center justify-center size-14 bg-app-cream border border-app-border rounded-2xl mb-5 shadow-sm">
            <MailIcon className="size-6 text-app-green" strokeWidth={1.5} />
          </div>

          {/* Eyebrow */}
          <p className="text-[11px] font-semibold text-app-green-accent tracking-widest uppercase mb-3 flex items-center justify-center gap-1.5">
            <SparklesIcon className="size-3" />
            Weekly Fresh Picks
          </p>
          {/* Heading */}
          <h2 className="font-serif text-3xl sm:text-4xl text-app-green leading-tight mb-3">
            Stay in the loop
          </h2>
          {/* Subtext */}
          <p className="text-[14px] text-app-text-light font-light leading-relaxed mb-2 max-w-sm mx-auto">
            Get weekly updates on fresh produce, seasonal offers, and exclusive discounts  right to your inbox.
          </p>
          {/* Trust note */}
          <p className="text-[11.5px] text-app-text-faint mb-8 flex items-center justify-center gap-1">
            <span className="size-1.5 rounded-full bg-app-green-accent inline-block" />
            No spam. Unsubscribe anytime.
          </p>
          {/* Form */}
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col sm:flex-row gap-2.5 max-w-md mx-auto"
          >
            <div className="relative flex-1">
              <MailIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-app-text-faint pointer-events-none" />
              <input
                type="email"
                placeholder="your@email.com"
                required
                className="w-full pl-10 pr-4 py-3 text-[13.5px] bg-app-cream border-[1.5px] border-app-cream-darker rounded-xl focus:border-app-green-light focus:bg-white focus:shadow-[0_0_0_3px_rgba(45,74,45,0.08)] text-app-text placeholder:text-app-text-faint transition-all"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-app-green hover:bg-app-green-lighter text-white text-[13.5px] font-semibold rounded-xl transition-colors active:scale-[0.98] whitespace-nowrap shadow-sm"
            >
              Subscribe
            </button>
          </form>
          {/* Social proof */}
          <p className="text-[11.5px] text-app-text-faint mt-5">
            Join <span className="font-semibold text-app-text-muted">12,000+</span> subscribers who love fresh deals
          </p>

        </div>
      </div>
    </section>
  )
}

export default Newsletter