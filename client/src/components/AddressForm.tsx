import { MapPinIcon, XIcon } from "lucide-react"

const AddressForm = ({ resetForm, handleSubmit, form, setFrom, editingId }: any) => {

  const inputClass = "w-full px-4 py-[10px] text-[13.5px] bg-app-cream border-[1.5px] border-app-cream-darker rounded-xl focus:border-app-green-light focus:bg-white text-app-text placeholder:text-app-text-faint outline-none transition-all"
  const labelClass = "block text-[11px] font-bold text-app-text-light uppercase tracking-widest mb-1.5"

  return (
    <>
      {/* Overlay */}
      <div
        onClick={resetForm}
        className="fixed inset-0 bg-black/30 z-50 backdrop-blur-[2px]"
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <form
          onClick={(e) => e.stopPropagation()}
          onSubmit={handleSubmit}
          className="bg-white rounded-3xl w-full max-w-lg shadow-[0_8px_40px_rgba(26,46,26,0.12)] animate-fade-in pointer-events-auto overflow-hidden"
        >

          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-app-border">
            <div className="flex items-center gap-3">
              <div className="size-8 bg-app-green rounded-[8px] flex items-center justify-center shrink-0">
                <MapPinIcon size={14} className="text-white" strokeWidth={2.2} />
              </div>
              <div>
                <h2 className="text-[15px] font-semibold text-app-text leading-tight">
                  {editingId ? "Edit Address" : "Add New Address"}
                </h2>
                <p className="text-[11px] text-app-text-light font-light leading-tight">
                  {editingId ? "Update your saved address" : "Save a new delivery address"}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={resetForm}
              className="size-8 flex items-center justify-center rounded-xl hover:bg-app-cream transition-colors"
              aria-label="Close"
            >
              <XIcon className="size-4 text-app-text-muted" />
            </button>
          </div>

          {/* Fields */}
          <div className="px-6 py-5 space-y-4">

            {/* Label */}
            <div>
              <label className={labelClass}>Label</label>
              <input
                type="text"
                placeholder="Home, Work, Other…"
                required
                value={form.label}
                onChange={(e) => setFrom({ ...form, label: e.target.value })}
                className={inputClass}
              />
            </div>

            {/* Street Address */}
            <div>
              <label className={labelClass}>Street Address</label>
              <input
                type="text"
                placeholder="123 Main Street"
                required
                value={form.address}
                onChange={(e) => setFrom({ ...form, address: e.target.value })}
                className={inputClass}
              />
            </div>

            {/* City + State */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelClass}>City</label>
                <input
                  type="text"
                  placeholder="Pune"
                  required
                  value={form.city}
                  onChange={(e) => setFrom({ ...form, city: e.target.value })}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>State</label>
                <input
                  type="text"
                  placeholder="Maharashtra"
                  required
                  value={form.state}
                  onChange={(e) => setFrom({ ...form, state: e.target.value })}
                  className={inputClass}
                />
              </div>
            </div>

            {/* ZIP + Default checkbox */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelClass}>ZIP Code</label>
                <input
                  type="text"
                  placeholder="411014"
                  required
                  value={form.zip}
                  onChange={(e) => setFrom({ ...form, zip: e.target.value })}
                  className={inputClass}
                />
              </div>
              <div className="flex items-end pb-1">
                <label className="flex items-center gap-2.5 cursor-pointer group">
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={form.isDefault}
                      onChange={(e) => setFrom({ ...form, isDefault: e.target.checked })}
                      className="sr-only"
                    />
                    <div
                      className={`size-5 rounded-md border-[1.5px] flex items-center justify-center transition-all
                        ${form.isDefault
                          ? "bg-app-green border-app-green"
                          : "bg-app-cream border-app-cream-darker group-hover:border-app-green-light"
                        }`}
                    >
                      {form.isDefault && (
                        <svg className="size-3 text-white" viewBox="0 0 12 12" fill="none">
                          <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </div>
                  </div>
                  <span className="text-[13px] font-medium text-app-text-muted group-hover:text-app-text transition-colors">
                    Set as default
                  </span>
                </label>
              </div>
            </div>

          </div>

          {/* Footer */}
          <div className="px-6 pb-6 flex gap-2.5">
            <button
              type="button"
              onClick={resetForm}
              className="flex-1 py-2.5 text-[13.5px] font-medium text-app-text-muted bg-app-cream hover:bg-app-cream-dark border border-app-border rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 text-[13.5px] font-semibold text-white bg-app-green hover:bg-app-green-lighter rounded-xl transition-colors active:scale-[0.98]"
            >
              {editingId ? "Update Address" : "Save Address"}
            </button>
          </div>

        </form>
      </div>
    </>
  )
}

export default AddressForm