import { heroSectionData } from "../../assets/assets"

const Features = () => {
  return (
    <section className="bg-white border border-[#e6e1d9] rounded-2xl overflow-hidden">
      <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 divide-x-0 md:divide-x divide-[#f0ece4]">
        {heroSectionData.hero_features.map((feature, i) => (
          <div
            key={i}
            className="flex items-center gap-3.5 px-5 py-5 group hover:bg-[#faf8f3] transition-colors duration-200"
          >
            {/* Icon container */}
            <div className="size-10 rounded-xl bg-[#eee9e0] group-hover:bg-[#e2ddd4] flex items-center justify-center shrink-0 transition-colors duration-200">
              <feature.icon className="size-[18px] text-[#2d4a2d]" strokeWidth={1.75} />
            </div>
            {/* Text */}
            <div className="min-w-0">
              <p className="text-[13px] font-semibold text-[#1a2e1a] leading-snug">
                {feature.title}
              </p>
              <p className="text-[11.5px] text-[#a09890] leading-snug mt-0.5 truncate">
                {feature.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Features