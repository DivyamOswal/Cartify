import { NavLink, Outlet } from "react-router-dom"
import {
  BarChart3Icon,
  LogOutIcon,
  PackageSearchIcon,
  PlusIcon,
  ShieldIcon,
  ShoppingBagIcon,
  TruckIcon,
} from "lucide-react"
import Navbar from "../../components/Navbar"

const adminLinks = [
  { to: "/admin",                    label: "Dashboard",         icon: BarChart3Icon    },
  { to: "/admin/products/new",       label: "Add Product",       icon: PlusIcon         },
  { to: "/admin/products",           label: "Products",          icon: PackageSearchIcon},
  { to: "/admin/orders",             label: "Orders",            icon: ShoppingBagIcon  },
  { to: "/admin/delivery-partners",  label: "Delivery Partners", icon: TruckIcon        },
]

export default function AdminLayout() {
  return (
    <div className="h-screen overflow-hidden flex flex-col">

      {/* Navbar — hidden on mobile */}
      <div className="max-lg:hidden shrink-0">
        <Navbar />
      </div>

      <div className="flex flex-1 overflow-hidden gap-6 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">

        {/* Sidebar */}
        <aside className="hidden lg:flex flex-col w-56 shrink-0">
          <div className="bg-white border border-app-border rounded-2xl overflow-hidden flex flex-col flex-1">

            {/* Sidebar header */}
            <div className="flex items-center gap-2.5 px-4 py-4 border-b border-app-border bg-app-green">
              <div className="size-7 rounded-[6px] bg-white/15 border border-white/15 flex items-center justify-center shrink-0">
                <ShieldIcon className="size-3.5 text-white" strokeWidth={2} />
              </div>
              <div>
                <p className="text-[13px] font-semibold text-white leading-tight">Admin Panel</p>
                <p className="text-[10px] text-white/50 font-light leading-tight">Cartify</p>
              </div>
            </div>

            {/* Nav links */}
            <nav className="flex flex-col gap-1 p-2 flex-1">
              {adminLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end
                  className={({ isActive }) =>
                    `flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all
                    ${isActive
                      ? "bg-app-green text-white shadow-sm"
                      : "text-app-text-muted hover:bg-app-cream hover:text-app-text"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <link.icon
                        className={`size-3.5 shrink-0 ${isActive ? "text-white" : "text-app-text-faint"}`}
                        strokeWidth={isActive ? 2.5 : 1.75}
                      />
                      {link.label}
                    </>
                  )}
                </NavLink>
              ))}
            </nav>

            {/* Exit — separated at bottom */}
            <div className="p-2 border-t border-app-border">
              <NavLink
                to="/"
                className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-[13px] font-medium text-app-error hover:bg-red-50 transition-colors w-full"
              >
                <LogOutIcon className="size-3.5 shrink-0" strokeWidth={1.75} />
                Exit Admin
              </NavLink>
            </div>

          </div>
        </aside>

        {/* Mobile tab bar */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-app-border z-40 px-2 py-1.5 flex items-center justify-around">
          {[...adminLinks, { to: "/", label: "Exit", icon: LogOutIcon }].map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end
              className={({ isActive }) =>
                `flex flex-col items-center gap-0.5 px-2 py-1 rounded-lg transition-colors
                ${isActive ? "text-app-green" : "text-app-text-faint"}`
              }
            >
              <link.icon className="size-5" strokeWidth={1.75} />
              <span className="text-[9px] font-medium">{link.label.split(" ")[0]}</span>
            </NavLink>
          ))}
        </div>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto no-scrollbar pb-20 lg:pb-8 animate-fade-in">
          <Outlet />
        </main>

      </div>
    </div>
  )
}