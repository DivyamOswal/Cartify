import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet"
import { MapPinIcon, NavigationIcon } from "lucide-react"
import L from "leaflet"
import { useEffect } from "react"
import "leaflet/dist/leaflet.css"
import { iconsForLeafpad } from "../../assets/assets"

function MapUpdater({ center }: { center: [number, number] }) {
  const map = useMap()
  useEffect(() => {
    map.setView(center, map.getZoom())
  }, [center, map])
  return null
}

export default function LiveMap({
  order,
  liveLocation,
}: {
  order: any
  liveLocation: any
}) {
  const truckIcon = new L.Icon({
    iconUrl: iconsForLeafpad.truck,
    iconSize: [36, 36],
    iconAnchor: [18, 36],
    popupAnchor: [0, -36],
  })

  const destinationIcon = new L.Icon({
    iconUrl: iconsForLeafpad.destination,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  })

  if (order.status === "Delivered" || order.status === "Cancelled") return null

  const hasLiveLocation = liveLocation && liveLocation.lat !== 0
  const hasDestination = order.shippingAddress?.lat && order.shippingAddress?.lng

  return (
    <div className="bg-white border border-app-border rounded-2xl overflow-hidden">

      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-app-border">
        <div className="flex items-center gap-2">
          <div className="size-7 rounded-lg bg-app-green/10 flex items-center justify-center">
            <NavigationIcon className="size-3.5 text-app-green" strokeWidth={1.75} />
          </div>
          <span className="text-[13px] font-semibold text-app-text">Live Tracking</span>
        </div>

        {/* Live pulse indicator */}
        {hasLiveLocation && (
          <div className="flex items-center gap-1.5">
            <span className="relative flex size-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-app-green-accent opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-app-green-accent" />
            </span>
            <span className="text-[11px] font-medium text-app-green-accent">Live</span>
          </div>
        )}
      </div>

      {/* Map */}
      <div style={{ height: 260 }}>
        {hasLiveLocation ? (
          <MapContainer
            center={[liveLocation.lat, liveLocation.lng]}
            zoom={15}
            style={{ height: "100%", width: "100%" }}
            zoomControl={false}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={[liveLocation.lat, liveLocation.lng]} icon={truckIcon}>
              <Popup>
                <span className="text-[12px] font-medium">Delivery Partner</span>
              </Popup>
            </Marker>
            {hasDestination && (
              <Marker
                position={[order.shippingAddress.lat, order.shippingAddress.lng]}
                icon={destinationIcon}
              >
                <Popup>
                  <span className="text-[12px] font-medium">Your Address</span>
                </Popup>
              </Marker>
            )}
            <MapUpdater center={[liveLocation.lat, liveLocation.lng]} />
          </MapContainer>
        ) : hasDestination ? (
          <MapContainer
            center={[order.shippingAddress.lat, order.shippingAddress.lng]}
            zoom={15}
            style={{ height: "100%", width: "100%" }}
            zoomControl={false}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker
              position={[order.shippingAddress.lat, order.shippingAddress.lng]}
              icon={destinationIcon}
            >
              <Popup>
                <span className="text-[12px] font-medium">Your Address</span>
              </Popup>
            </Marker>
          </MapContainer>
        ) : (
          /* No location available */
          <div className="h-full bg-app-cream flex flex-col items-center justify-center gap-3">
            <div className="size-12 rounded-2xl bg-white border border-app-border flex items-center justify-center shadow-sm">
              <MapPinIcon className="size-6 text-app-text-faint" strokeWidth={1.5} />
            </div>
            <div className="text-center">
              <p className="text-[13px] font-medium text-app-text-muted">
                Waiting for location
              </p>
              <p className="text-[11.5px] text-app-text-faint mt-0.5 font-light">
                Delivery partner location will appear here
              </p>
            </div>
            {/* Animated dots */}
            <div className="flex items-center gap-1.5">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="size-1.5 rounded-full bg-app-green-accent/50 animate-pulse-soft"
                  style={{ animationDelay: `${i * 0.2}s` }}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer — address */}
      {hasDestination && (
        <div className="flex items-center gap-2.5 px-4 py-3 border-t border-app-border bg-app-cream/50">
          <MapPinIcon className="size-3.5 text-app-green-accent shrink-0" strokeWidth={1.75} />
          <p className="text-[12px] text-app-text-muted truncate">
            {order.shippingAddress.address}, {order.shippingAddress.city}
          </p>
        </div>
      )}
    </div>
  )
}