import type { Address } from '../types'
import { CheckIcon, MapPinIcon, PencilIcon, Trash2Icon } from 'lucide-react'

interface AddressCardProps {
  addr: Address
  onEditHandler: (addr: Address) => void
  setAddresses: (addresses: Address) => void
}

const AddressCard = ({ addr, onEditHandler, setAddresses }: AddressCardProps) => {

  const handleDelete = async (id: string) => {
    console.log(id)
  }

  return (
    <div className={`bg-white rounded-2xl p-5 flex items-start justify-between gap-4 border transition-all
      ${addr.isDefault
        ? "border-app-green shadow-[0_0_0_1px_rgba(45,74,45,0.08)]"
        : "border-app-border hover:border-app-cream-darker"
      }`}
    >
      {/* Left */}
      <div className="flex gap-3.5 min-w-0">

        {/* Icon */}
        <div className={`size-9 rounded-[10px] flex items-center justify-center shrink-0
          ${addr.isDefault ? "bg-app-green" : "bg-app-cream border border-app-border"}`}
        >
          <MapPinIcon
            className={`size-4 ${addr.isDefault ? "text-white" : "text-app-green"}`}
            strokeWidth={1.75}
          />
        </div>

        {/* Info */}
        <div className="min-w-0">
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <p className="text-[13.5px] font-semibold text-app-text leading-tight">
              {addr.label}
            </p>
            {addr.isDefault && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-bold bg-app-green text-white rounded-full">
                <CheckIcon className="size-2.5" strokeWidth={3} />
                Default
              </span>
            )}
          </div>
          <p className="text-[13px] text-app-text-muted font-light leading-relaxed">
            {addr.address},<br />
            {addr.city}, {addr.state} – {addr.zip}
          </p>
        </div>
      </div>

      {/* Right — actions */}
      <div className="flex items-center gap-1 shrink-0">
        <button
          onClick={() => onEditHandler(addr)}
          className="size-8 flex items-center justify-center rounded-xl text-app-text-faint hover:text-app-green hover:bg-app-cream transition-colors"
          aria-label="Edit address"
        >
          <PencilIcon className="size-3.5" strokeWidth={1.75} />
        </button>
        <button
          onClick={() => handleDelete(addr._id)}
          className="size-8 flex items-center justify-center rounded-xl text-app-text-faint hover:text-app-error hover:bg-red-50 transition-colors"
          aria-label="Delete address"
        >
          <Trash2Icon className="size-3.5" strokeWidth={1.75} />
        </button>
      </div>
    </div>
  )
}

export default AddressCard