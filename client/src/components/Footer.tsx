import { ShoppingBag } from 'lucide-react'
import { Link } from 'react-router-dom'
import { footerData } from '../assets/assets'

const Footer = () => {
  return (
    <footer className="bg-app-green relative overflow-hidden">

      {/* Decorative blobs */}
      <div className="absolute -top-10 -left-10 w-52 h-64 rounded-[50%_0] bg-white/[0.03] rotate-[-20deg] pointer-events-none" />
      <div className="absolute top-20 right-0 w-44 h-56 rounded-[50%_0] bg-white/[0.03] rotate-[25deg] pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 w-32 h-40 rounded-[50%_0] bg-white/[0.02] rotate-[-10deg] pointer-events-none" />

      {/* Top shimmer */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-app-green-accent/30 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-8">

        {/* Main grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr] gap-10 mb-12">
          {/* Brand column */}
          <div className="lg:col-span-1">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 mb-5">
              <div className="size-8 bg-white/10 rounded-[8px] flex items-center justify-center shrink-0">
                <ShoppingBag size={15} className="text-white" strokeWidth={2.2} />
              </div>
              <span className="text-[17px] font-semibold text-white tracking-[-0.4px]">
                Cartify
              </span>
            </Link>

            <p className="text-[13px] text-white/50 font-light leading-relaxed mb-6">
              {footerData.brand.description}
            </p>

            {/* Stats strip */}
            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-white/10">
              <div>
                <p className="text-[15px] font-bold text-white/30 leading-tight">12k+</p>
                <p className="text-[10px] text-white/30 font-light mt-0.5">Customers</p>
              </div>
              <div className="w-px h-6 bg-white/10" />
              <div>
                <p className="text-[15px] font-bold text-white/30 leading-tight">500+</p>
                <p className="text-[10px] text-white/30 font-light mt-0.5">Products</p>
              </div>
              <div className="w-px h-6 bg-white/10" />
              <div>
                <p className="text-[15px] font-bold text-white/30 leading-tight">2hr</p>
                <p className="text-[10px] text-white/30 font-light mt-0.5">Delivery</p>
              </div>
            </div>

            {/* Socials */}
            <div className="flex gap-2">
              {footerData.brand.socials.map((social, i) => (
                <a
                  key={i}
                  href={social.link}
                  className="size-8 rounded-lg bg-white/8 border border-white/10 flex items-center justify-center hover:bg-white/15 hover:border-white/20 transition-all"
                  aria-label={`Social link ${i + 1}`}
                >
                  <social.icon className="size-3.5 text-white/70" />
                </a>
              ))}
            </div>
          </div>

          {/* Dynamic link sections */}
          {footerData.sections.map((section, i) => (
            <div key={i}>
              <h3 className="text-[10.5px] font-bold text-white/40 uppercase tracking-widest mb-4">
                {section.title}
              </h3>
              <ul className="space-y-2.5">
                {section.links.map((link, index) => (
                  <li key={index}>
                    {link.to ? (
                      <Link
                        to={link.to}
                        className="text-[13px] text-white/60 hover:text-white transition-colors"
                      >
                        {link.label}
                      </Link>
                    ) : (
                      
                        <a href={link.href}
                        className="text-[13px] text-white/60 hover:text-white transition-colors"
                      >
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact column */}
          <div>
            <h3 className="text-[10.5px] font-bold text-white/40 uppercase tracking-widest mb-4">
              Contact Us
            </h3>
            <ul className="space-y-3.5">
              {footerData.contact.map((item, i) => {
                const Icon = item.icon
                return (
                  <li key={i} className="flex items-start gap-2.5">
                    <div className="size-6 rounded-md bg-white/8 border border-white/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Icon className="size-3 text-app-green-accent" />
                    </div>
                    <span className="text-[13px] text-white/60 leading-snug">
                      {item.text}
                    </span>
                  </li>
                )
              })}
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-[11.5px] text-white/30">
            {footerData.bottom.copyright}
          </p>
          <div className="flex items-center gap-1">
            {footerData.bottom.links.map((link, i) => (
              <span key={i} className="flex items-center gap-1">
                
                  <a href={link.href}
                  className="text-[11.5px] text-white/30 hover:text-white/60 transition-colors"
                >
                  {link.label}
                </a>
                {i < footerData.bottom.links.length - 1 && (
                  <span className="text-white/20 text-[11px] mx-1">·</span>
                )}
              </span>
            ))}
          </div>
        </div>

      </div>
    </footer>
  )
}

export default Footer