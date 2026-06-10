import { CheckIcon, ChevronRightIcon, MapPinIcon, PlusIcon } from 'lucide-react'
import { Link } from 'react-router-dom'

const CheckoutAddress = ({ user, address, setAddress, setStep }: any) => {

  const isSelected = (addr: any) =>
    address.label === addr.label && address.address === addr.address

  return (
    <div className="bg-white border border-app-border rounded-2xl overflow-hidden animate-fade-in">

      {/* Header */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-app-border">
        <div className="size-8 bg-app-green rounded-[8px] flex items-center justify-center shrink-0">
          <MapPinIcon size={14} className="text-white" strokeWidth={2.2} />
        </div>
        <div>
          <h2 className="text-[15px] font-semibold text-app-text leading-tight">
            Delivery Address
          </h2>
          <p className="text-[11px] text-app-text-light font-light leading-tight">
            Choose where to deliver your order
          </p>
        </div>
      </div>

      <div className="p-5 space-y-5">

        {/* Saved addresses */}
        {user?.addresses && user.addresses.length > 0 ? (
          <div>
            <p className="text-[10.5px] font-bold text-app-text-light uppercase tracking-widest mb-3">
              Saved Addresses
            </p>
            <div className="grid sm:grid-cols-2 gap-2.5">
              {user.addresses.map((addr: any) => {
                const selected = isSelected(addr)
                return (
                  <div
                    key={addr._id || addr.label}
                    onClick={() => setAddress({
                      label:   addr.label,
                      address: addr.address,
                      city:    addr.city,
                      state:   addr.state,
                      zip:     addr.zip,
                      lat:     addr.lat,
                      lng:     addr.lng,
                    })}
                    className={`relative p-4 rounded-xl border-[1.5px] cursor-pointer transition-all
                      ${selected
                        ? "border-app-green bg-[#86c75a]/5 shadow-[0_0_0_1px_rgba(45,74,45,0.08)]"
                        : "border-app-border hover:border-app-cream-darker hover:bg-app-cream"
                      }`}
                  >
                    {/* Selected checkmark */}
                    {selected && (
                      <div className="absolute top-3 right-3 size-5 bg-app-green rounded-full flex items-center justify-center">
                        <CheckIcon className="size-3 text-white" strokeWidth={2.5} />
                      </div>
                    )}

                    {/* Label row */}
                    <div className="flex items-center gap-2 mb-1.5 pr-6">
                      <MapPinIcon
                        className={`size-3.5 shrink-0 ${selected ? "text-app-green" : "text-app-text-faint"}`}
                        strokeWidth={1.75}
                      />
                      <span className={`text-[13px] font-semibold ${selected ? "text-app-text" : "text-app-text-muted"}`}>
                        {addr.label}
                      </span>
                      {addr.isDefault && (
                        <span className="text-[9.5px] font-bold text-[#3b6d11] bg-[#86c75a]/15 border border-[#86c75a]/30 px-1.5 py-0.5 rounded-full">
                          Default
                        </span>
                      )}
                    </div>

                    {/* Address lines */}
                    <p className="text-[12.5px] text-app-text-muted truncate leading-snug">
                      {addr.address}
                    </p>
                    <p className="text-[11.5px] text-app-text-faint mt-0.5">
                      {addr.city}, {addr.state} – {addr.zip}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        ) : (
          /* No addresses saved */
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <div className="size-12 rounded-2xl bg-app-cream border border-app-border flex items-center justify-center mb-3">
              <MapPinIcon className="size-5 text-app-text-faint" strokeWidth={1.5} />
            </div>
            <p className="text-[13px] font-medium text-app-text-muted mb-1">
              No saved addresses
            </p>
            <p className="text-[12px] text-app-text-faint font-light">
              Add an address to continue
            </p>
          </div>
        )}

        {/* Add new address link */}
        <Link
          to="/addresses"
          className="flex items-center justify-center gap-1.5 w-full py-2.5 text-[13px] font-medium text-app-text-muted bg-app-cream hover:bg-app-cream-dark border border-app-border rounded-xl transition-colors"
        >
          <PlusIcon className="size-3.5" strokeWidth={2.5} />
          Add New Address
        </Link>

        {/* Divider */}
        <div className="h-px bg-app-border" />

        {/* CTA */}
        <button
          onClick={() => { setStep("payment"); window.scrollTo(0, 0) }}
          disabled={!address.address || !address.city}
          className="w-full flex items-center justify-center gap-2 py-3 bg-app-green hover:bg-app-green-lighter text-white text-[13.5px] font-semibold rounded-xl transition-colors disabled:opacity-40 active:scale-[0.98]"
        >
          Continue to Payment
          <ChevronRightIcon className="size-4" />
        </button>

        {/* Helper text */}
        {!address.address && (
          <p className="text-[11.5px] text-app-text-faint text-center -mt-2">
            Select an address above to continue
          </p>
        )}

      </div>
    </div>
  )
}

export default CheckoutAddress