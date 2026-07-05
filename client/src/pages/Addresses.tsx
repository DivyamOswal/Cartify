import { useEffect, useState } from "react"
import type { Address } from "../types"
import { dummyAddressData } from "../assets/assets"
import { MapPinIcon, PlusIcon } from "lucide-react"
import Loading from "../components/Loading"
import AddressCard from "../components/AddressCard"
import AddressForm from "../components/AddressForm"

const Addresses = () => {
  const [addresses, setAddresses] = useState<Address[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)

  const [form, setForm] = useState({
    label: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    isDefault: false,
  })

  const resetForm = () => {
    setForm({ label: "", address: "", city: "", state: "", zip: "", isDefault: false })
    setShowForm(false)
    setEditingId(null)
  }

  const handleSubmit = async (e: React.FormEvent) => { // ✅ FormEvent not SubmitEvent
    e.preventDefault()
  }

  const onEditHandler = (addr: Address) => {
    setForm({
      label: addr.label,
      address: addr.address,
      city: addr.city,
      state: addr.state,
      zip: addr.zip,
      isDefault: addr.isDefault,
    })
    setEditingId(addr.id)
    setShowForm(true)
  }

  useEffect(() => {
    setAddresses(dummyAddressData)
    setTimeout(() => setLoading(false), 1000)
  }, [])

  const defaultAddress = addresses.find((a) => a.isDefault)
  const otherAddresses = addresses.filter((a) => !a.isDefault)

  return (
    <div className="min-h-screen bg-app-cream">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Page header */}
        <div className="flex items-start justify-between mb-8 gap-4">
          <div>
            <p className="text-[11px] font-semibold text-app-green-accent tracking-widest uppercase mb-1.5">
              Account
            </p>
            <h1 className="font-serif text-2xl sm:text-3xl text-app-text leading-tight">
              My Addresses
            </h1>
            <p className="text-[13px] text-app-text-light mt-1 font-light">
              {addresses.length} saved address{addresses.length !== 1 ? "es" : ""}
            </p>
          </div>
          <button
            onClick={() => { resetForm(); setShowForm(true) }}
            className="shrink-0 flex items-center gap-1.5 px-4 py-2.5 bg-app-green hover:bg-app-green-lighter text-white text-[13px] font-semibold rounded-xl transition-colors active:scale-[0.98]"
          >
            <PlusIcon className="size-3.5" strokeWidth={2.5} />
            Add Address
          </button>
        </div>

        {/* Form modal */}
        {showForm && (
          <AddressForm
            resetForm={resetForm}
            handleSubmit={handleSubmit}
            form={form}
            setFrom={setForm}
            editingId={editingId}
          />
        )}

        {/* Content */}
        {loading ? (
          <Loading />
        ) : addresses.length === 0 ? (

          /* Empty state */
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="size-16 rounded-2xl bg-white border border-app-border flex items-center justify-center mb-4 shadow-sm">
              <MapPinIcon className="size-7 text-app-text-faint" strokeWidth={1.5} />
            </div>
            <h3 className="font-serif text-xl text-app-text mb-2">No addresses saved</h3>
            <p className="text-[13px] text-app-text-light font-light mb-6">
              Add an address for faster checkout
            </p>
            <button
              onClick={() => { resetForm(); setShowForm(true) }}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-app-green hover:bg-app-green-lighter text-white text-[13px] font-semibold rounded-xl transition-colors"
            >
              <PlusIcon className="size-3.5" strokeWidth={2.5} />
              Add First Address
            </button>
          </div>

        ) : (
          <div className="space-y-6">

            {/* Default address — highlighted section */}
            {defaultAddress && (
              <div>
                <p className="text-[10.5px] font-bold text-app-text-light uppercase tracking-widest mb-3">
                  Default Address
                </p>
                <AddressCard
                  key={defaultAddress.id}
                  addr={defaultAddress}
                  onEditHandler={onEditHandler}
                  setAddresses={setAddresses}
                />
              </div>
            )}

            {/* Other addresses */}
            {otherAddresses.length > 0 && (
              <div>
                <p className="text-[10.5px] font-bold text-app-text-light uppercase tracking-widest mb-3">
                  {defaultAddress ? "Other Addresses" : "Saved Addresses"}
                </p>
                <div className="space-y-3">
                  {otherAddresses.map((addr) => (
                    <AddressCard
                      key={addr.id}
                      addr={addr}
                      onEditHandler={onEditHandler}
                      setAddresses={setAddresses}
                    />
                  ))}
                </div>
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  )
}

export default Addresses