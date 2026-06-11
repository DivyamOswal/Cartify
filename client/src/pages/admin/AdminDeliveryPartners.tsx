import { useEffect, useState } from "react"
import {
  Loader2Icon,
  MailIcon,
  PhoneIcon,
  PlusIcon,
  TruckIcon,
  UserCheckIcon,
  UserXIcon,
  XIcon,
} from "lucide-react"
import type { DeliveryPartner } from "../../assets/types"
import Loading from "../../components/Loading"
import { dummyDeliveryPartnerData } from "../../assets/assets"

const vehicleIcons: Record<string, string> = {
  bike:    "🏍️",
  scooter: "🛵",
  car:     "🚗",
}

const inputClass = "w-full px-4 py-[10px] text-[13.5px] bg-app-cream border-[1.5px] border-app-cream-darker rounded-xl focus:border-app-green-light focus:bg-white text-app-text placeholder:text-app-text-faint outline-none transition-all"
const labelClass = "block text-[11px] font-bold text-app-text-light uppercase tracking-widest mb-1.5"

export default function AdminDeliveryPartners() {
  const [partners, setPartners] = useState<DeliveryPartner[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({
    name: "", email: "", password: "", phone: "", vehicleType: "bike",
  })

  useEffect(() => {
    setPartners(dummyDeliveryPartnerData as any)
    setTimeout(() => setLoading(false), 1000)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {  // ✅ FormEvent not SubmitEvent
    e.preventDefault()
  }

  const toggleActive = async (id: string, isActive: boolean) => {
    console.log(id, isActive)
  }

  const resetForm = () => {
    setForm({ name: "", email: "", password: "", phone: "", vehicleType: "bike" })
    setShowForm(false)
  }

  if (loading) return <Loading />

  const activeCount   = partners.filter((p) => p.isActive).length
  const inactiveCount = partners.length - activeCount

  return (
    <div className="space-y-6">

      {/* Page header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[11px] font-semibold text-app-green-accent tracking-widest uppercase mb-1">
            Admin
          </p>
          <h1 className="font-serif text-2xl sm:text-3xl text-app-text leading-tight">
            Delivery Partners
          </h1>
          <p className="text-[13px] text-app-text-light mt-1 font-light">
            {activeCount} active · {inactiveCount} inactive
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="shrink-0 flex items-center gap-1.5 px-4 py-2.5 bg-app-green hover:bg-app-green-lighter text-white text-[13px] font-semibold rounded-xl transition-colors active:scale-[0.98]"
        >
          <PlusIcon className="size-3.5" strokeWidth={2.5} />
          Add Partner
        </button>
      </div>

      {/* Empty state */}
      {partners.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-white border border-app-border rounded-2xl text-center">
          <div className="size-14 rounded-2xl bg-app-cream border border-app-border flex items-center justify-center mb-4">
            <TruckIcon className="size-6 text-app-text-faint" strokeWidth={1.5} />
          </div>
          <h3 className="font-serif text-xl text-app-text mb-2">No delivery partners</h3>
          <p className="text-[13px] text-app-text-light font-light mb-6">
            Onboard your first partner to get started
          </p>
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-app-green hover:bg-app-green-lighter text-white text-[13px] font-semibold rounded-xl transition-colors"
          >
            <PlusIcon className="size-3.5" strokeWidth={2.5} /> Add First Partner
          </button>
        </div>
      ) : (

        /* Partners grid */
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {partners.map((p) => (
            <div
              key={p._id}
              className="bg-white border border-app-border rounded-2xl overflow-hidden hover:border-app-cream-darker hover:shadow-[0_2px_12px_rgba(26,46,26,0.06)] transition-all"
            >
              {/* Card header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-app-border bg-app-cream/40">
                <div className="flex items-center gap-3">
                  <div className="size-9 rounded-[8px] bg-app-green-light flex items-center justify-center shrink-0">
                    <span className="text-[13px] font-bold text-white">
                      {p.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="text-[13.5px] font-semibold text-app-text leading-tight">
                      {p.name}
                    </p>
                    <p className="text-[11px] text-app-text-faint capitalize mt-0.5">
                      {vehicleIcons[p.vehicleType]} {p.vehicleType}
                    </p>
                  </div>
                </div>
                <span className={`px-2.5 py-1 text-[10px] font-bold rounded-full ${
                  p.isActive
                    ? "bg-green-50 text-green-700 border border-green-200"
                    : "bg-red-50 text-red-500 border border-red-200"
                }`}>
                  {p.isActive ? "Active" : "Inactive"}
                </span>
              </div>

              {/* Contact info */}
              <div className="px-5 py-4 space-y-2">
                <div className="flex items-center gap-2.5 text-[12.5px] text-app-text-muted">
                  <MailIcon className="size-3.5 text-app-text-faint shrink-0" strokeWidth={1.75} />
                  <span className="truncate">{p.email}</span>
                </div>
                <div className="flex items-center gap-2.5 text-[12.5px] text-app-text-muted">
                  <PhoneIcon className="size-3.5 text-app-text-faint shrink-0" strokeWidth={1.75} />
                  <span>{p.phone}</span>
                </div>
              </div>

              {/* Toggle button */}
              <div className="px-4 pb-4">
                <button
                  onClick={() => toggleActive(p._id, p.isActive)}
                  className={`w-full py-2 text-[12.5px] font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-colors
                    ${p.isActive
                      ? "bg-red-50 text-app-error hover:bg-red-100 border border-red-200"
                      : "bg-[#86c75a]/10 text-[#3b6d11] hover:bg-[#86c75a]/20 border border-[#86c75a]/30"
                    }`}
                >
                  {p.isActive
                    ? <><UserXIcon className="size-3.5" strokeWidth={2} /> Deactivate</>
                    : <><UserCheckIcon className="size-3.5" strokeWidth={2} /> Activate</>
                  }
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Partner Modal */}
      {showForm && (
        <>
          <div
            onClick={resetForm}
            className="fixed inset-0 bg-black/30 z-50 backdrop-blur-[2px]"
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <form
              onClick={(e) => e.stopPropagation()}
              onSubmit={handleSubmit}
              className="bg-white rounded-3xl w-full max-w-lg shadow-[0_8px_40px_rgba(26,46,26,0.12)] animate-fade-in pointer-events-auto overflow-hidden"
            >

              {/* Modal header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-app-border">
                <div className="flex items-center gap-3">
                  <div className="size-8 bg-app-green rounded-[8px] flex items-center justify-center shrink-0">
                    <TruckIcon size={14} className="text-white" strokeWidth={2.2} />
                  </div>
                  <div>
                    <h2 className="text-[15px] font-semibold text-app-text leading-tight">
                      Onboard Delivery Partner
                    </h2>
                    <p className="text-[11px] text-app-text-light font-light leading-tight">
                      Add a new partner to your delivery fleet
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

                <div>
                  <label className={labelClass}>Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Sharma"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className={inputClass}
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={labelClass}>Email</label>
                    <input
                      type="email"
                      required
                      placeholder="partner@email.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Password</label>
                    <input
                      type="password"
                      required
                      minLength={6}
                      placeholder="Min. 6 characters"
                      value={form.password}
                      onChange={(e) => setForm({ ...form, password: e.target.value })}
                      className={inputClass}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={labelClass}>Phone</label>
                    <input
                      type="text"
                      required
                      placeholder="+91 98765 43210"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Vehicle Type</label>
                    <select
                      value={form.vehicleType}
                      onChange={(e) => setForm({ ...form, vehicleType: e.target.value })}
                      className={inputClass}
                    >
                      <option value="bike">🏍️ Bike</option>
                      <option value="scooter">🛵 Scooter</option>
                      <option value="car">🚗 Car</option>
                    </select>
                  </div>
                </div>

              </div>

              {/* Footer */}
              <div className="px-6 pb-6 flex gap-2.5">
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 py-2.5 text-[13px] font-medium text-app-text-muted bg-app-cream hover:bg-app-cream-dark border border-app-border rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 py-2.5 text-[13.5px] font-semibold text-white bg-app-green hover:bg-app-green-lighter rounded-xl transition-colors disabled:opacity-50 flex items-center justify-center gap-1.5 active:scale-[0.98]"
                >
                  {saving ? (
                    <><Loader2Icon className="size-3.5 animate-spin" /> Creating…</>
                  ) : (
                    "Create Partner"
                  )}
                </button>
              </div>

            </form>
          </div>
        </>
      )}

    </div>
  )
}