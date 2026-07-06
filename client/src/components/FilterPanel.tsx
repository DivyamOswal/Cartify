import { SlidersHorizontalIcon, XIcon } from "lucide-react"

const FilterPanel = ({
  categories,
  category,
  minPrice,
  maxPrice,
  updateFilter,
  updateFilters,
  clearFilters,
  hasFilters,
}: any) => {

  const categoriesWithAll = [{ slug: "", name: "All Categories" }, ...categories]

  const pricePresets = [
    { label: "Under ₹100", min: 0,   max: 100      },
    { label: "₹100–₹300",  min: 100, max: 300      },
    { label: "₹300+",      min: 300, max: undefined },
  ]

  return (
    <div className="space-y-5">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SlidersHorizontalIcon className="size-4 text-app-green" strokeWidth={1.75} />
          <span className="text-[13.5px] font-semibold text-app-text">Filters</span>
        </div>
        {hasFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-1 text-[11.5px] font-medium text-app-error hover:text-red-700 transition-colors"
          >
            <XIcon className="size-3" strokeWidth={2.5} />
            Clear all
          </button>
        )}
      </div>

      <div className="h-px bg-app-border" />

      {/* Categories */}
      <div>
        <p className="text-[10.5px] font-bold text-app-text-light uppercase tracking-widest mb-2.5">
          Category
        </p>
        <div className="space-y-1">
          {categoriesWithAll.map((cat: any) => (
            <button
              key={cat.slug}
              onClick={() => updateFilter("category", cat.slug)}
              className={`flex items-center justify-between w-full text-left px-3 py-2.5 text-[13px] rounded-xl transition-all duration-150
                ${category === cat.slug
                  ? "bg-app-green text-white font-semibold"
                  : "text-app-text-muted hover:bg-app-cream hover:text-app-text font-medium"
                }`}
            >
              {cat.name}
              {category === cat.slug && (
                <span className="size-1.5 rounded-full bg-app-green-accent shrink-0" />
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="h-px bg-app-border" />

      {/* Price Range */}
      <div>
        <p className="text-[10.5px] font-bold text-app-text-light uppercase tracking-widest mb-2.5">
          Price Range
        </p>

        {/* Min / Max inputs */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex-1">
            <label className="text-[10px] text-app-text-faint font-medium mb-1 block">Min</label>
            <div className="relative">
              <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[12px] text-app-text-faint pointer-events-none">
                ₹
              </span>
              <input
                type="number"
                min={0}
                value={minPrice ?? ""}
                onChange={(e) =>
                  updateFilter("minPrice", e.target.value ? Number(e.target.value) : undefined)
                }
                placeholder="0"
                className="w-full pl-6 pr-2 py-2 text-[12.5px] bg-app-cream border border-app-cream-darker rounded-lg focus:border-app-green-light focus:bg-white text-app-text placeholder:text-app-text-faint transition-all"
              />
            </div>
          </div>

          <span className="text-app-text-faint text-[12px] mt-4 shrink-0">-</span>

          <div className="flex-1">
            <label className="text-[10px] text-app-text-faint font-medium mb-1 block">Max</label>
            <div className="relative">
              <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[12px] text-app-text-faint pointer-events-none">
                ₹
              </span>
              <input
                type="number"
                min={0}
                value={maxPrice ?? ""}
                onChange={(e) =>
                  updateFilter("maxPrice", e.target.value ? Number(e.target.value) : undefined)
                }
                placeholder="999"
                className="w-full pl-6 pr-2 py-2 text-[12.5px] bg-app-cream border border-app-cream-darker rounded-lg focus:border-app-green-light focus:bg-white text-app-text placeholder:text-app-text-faint transition-all"
              />
            </div>
          </div>
        </div>

        {/* Quick presets - atomic update */}
        <div className="flex flex-wrap gap-1.5">
          {pricePresets.map((preset) => {
            const isActive =
              Number(minPrice) === preset.min &&
              (preset.max === undefined
                ? !maxPrice
                : Number(maxPrice) === preset.max)

            return (
              <button
                key={preset.label}
                onClick={() =>
                  updateFilters({
                    minPrice: preset.min,
                    maxPrice: preset.max ?? "",
                  })
                }
                className={`text-[11px] font-medium px-2.5 py-1 rounded-lg border transition-all
                  ${isActive
                    ? "bg-app-green text-white border-app-green"
                    : "bg-app-cream border-app-cream-darker text-app-text-muted hover:border-app-green hover:text-app-green"
                  }`}
              >
                {preset.label}
              </button>
            )
          })}
        </div>
      </div>

      <div className="h-px bg-app-border" />

      {/* Organic toggle */}
      <div>
        <p className="text-[10.5px] font-bold text-app-text-light uppercase tracking-widest mb-2.5">
          Preferences
        </p>
        <button
          onClick={() => updateFilter("isOrganic", true)}
          className="flex items-center gap-2.5 w-full px-3 py-2.5 rounded-xl border bg-app-cream border-app-cream-darker text-app-text-muted hover:border-app-green hover:text-app-green text-[13px] font-medium transition-all"
        >
          <span className="size-4 rounded-md bg-[#86c75a]/20 border border-[#86c75a]/40 flex items-center justify-center shrink-0">
            <span className="size-1.5 rounded-full bg-[#3b6d11]" />
          </span>
          Organic only
        </button>
      </div>

    </div>
  )
}

export default FilterPanel