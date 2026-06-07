import {
  ArrowUpRightIcon,
  ChevronDownIcon,
  LogOutIcon,
  MapPinIcon,
  MenuIcon,
  PackageIcon,
  SearchIcon,
  ShieldIcon,
  ShoppingBag,
  ShoppingCart,
  UserIcon,
  XIcon,
} from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CardContext";

const Navbar = () => {
  const user: any = {
    name: "John Doe",
    email: "john@example.com",
    isAdmin: true,
  };
  const { cartCount, setIsCartOpen } = useCart()
  const [searchQuery, setSearchQuery] = useState("");
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  const handleLogout = () => {
    setUserMenuOpen(false);
    navigate("/");
  };

  return (
    <nav className="bg-app-cream sticky top-0 z-50 border-b border-app-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 gap-4">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <ShoppingBag size={22} className="text-app-green" />
          <span className="text-[18px] font-semibold text-app-green tracking-tight">Cartify</span>
        </Link>

        <div className="w-full flex items-center justify-end gap-4 lg:gap-8">

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-6 text-[13px] font-medium text-app-text-light">
            <Link to="/" className="hover:text-app-text transition-colors">Home</Link>
            <Link to="/products" className="hover:text-app-text transition-colors">Products</Link>
            <Link to="/deals" className="text-app-orange hover:text-app-orange-dark transition-colors">
              Deals
            </Link>
          </div>

          {/* Search */}
          <form onSubmit={handleSearch} className="hidden sm:flex flex-1 max-w-xs">
            <div className="relative w-full">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-app-text-light/50" />
              <input
                type="text"
                placeholder="Search groceries..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-[13px] bg-white border border-app-border rounded-full focus:border-app-green text-app-text placeholder:text-app-text-light/50 transition-colors"
              />
            </div>
          </form>

          {/* Right Actions */}
          <div className="flex items-center gap-1">

            {/* Cart */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 rounded-xl hover:bg-app-cream-dark transition-colors"
            >
              <ShoppingCart className="size-[18px] text-app-text" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 size-4 bg-app-orange text-white text-[9px] font-semibold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* User */}
            <div className="relative">
              {user ? (
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-1.5 pl-1 pr-2 py-1.5 rounded-xl hover:bg-app-cream-dark transition-colors"
                >
                  <div className="size-7 rounded-full bg-app-green text-white text-[12px] font-medium flex items-center justify-center">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <ChevronDownIcon className="size-3 text-app-text-light" />
                </button>
              ) : (
                <div className="flex items-center gap-2">
                  <Link
                    to="/login"
                    className="hidden md:flex items-center gap-1.5 px-4 py-2 text-[13px] font-medium text-white bg-app-green hover:bg-app-green-light rounded-full transition-colors"
                  >
                    <UserIcon size={14} /> Sign In
                  </Link>
                  <button
                    className="md:hidden p-2 rounded-xl hover:bg-app-cream-dark transition-colors"
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                  >
                    {userMenuOpen
                      ? <XIcon className="size-5 text-app-text" />
                      : <MenuIcon className="size-5 text-app-text" />
                    }
                  </button>
                </div>
              )}

              {/* Dropdown */}
              {userMenuOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setUserMenuOpen(false)} />
                  <div className="absolute top-full right-0 mt-2 w-52 bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.08)] border border-app-border py-1.5 z-50 animate-fade-in">

                    {user && (
                      <div className="px-4 py-3 border-b border-app-border mb-1">
                        <p className="text-[13.5px] font-bold text-app-text">{user.name}</p>
                        <p className="text-[11.5px] text-app-text-light mt-0.5">{user.email}</p>
                      </div>
                    )}

                    <div onClick={() => setUserMenuOpen(false)}>
                      {!user && (
                        <Link to="/login" className="flex items-center gap-3 px-4 py-2.5 text-[13px] text-app-text-light hover:bg-app-cream hover:text-app-text transition-colors rounded-lg mx-1">
                          <UserIcon size={15} className="text-app-text-light" strokeWidth={1.5} /> Sign In
                        </Link>
                      )}
                      {user && (
                        <Link to="/orders" className="flex items-center gap-3 px-4 py-2.5 text-[13px] text-app-text-light hover:bg-app-cream hover:text-app-text transition-colors rounded-lg mx-1">
                          <PackageIcon size={15} className="text-app-text-light" strokeWidth={1.5} /> My Orders
                        </Link>
                      )}
                      {user && (
                        <Link to="/addresses" className="flex items-center gap-3 px-4 py-2.5 text-[13px] text-app-text-light hover:bg-app-cream hover:text-app-text transition-colors rounded-lg mx-1">
                          <MapPinIcon size={15} className="text-app-text-light" strokeWidth={1.5} /> Addresses
                        </Link>
                      )}
                      <Link to="/products" className="flex items-center gap-3 px-4 py-2.5 text-[13px] text-app-text-light hover:bg-app-cream hover:text-app-text transition-colors rounded-lg mx-1 md:hidden">
                        <ArrowUpRightIcon size={15} className="text-app-text-light" strokeWidth={1.5} /> Products
                      </Link>
                      <Link to="/deals" className="flex items-center gap-3 px-4 py-2.5 text-[13px] text-app-text-light hover:bg-app-cream hover:text-app-text transition-colors rounded-lg mx-1 md:hidden">
                        <ArrowUpRightIcon size={15} className="text-app-text-light" strokeWidth={1.5} /> Deals
                      </Link>
                      {user?.isAdmin && (
                        <Link to="/admin/products" className="flex items-center gap-3 px-4 py-2.5 text-[13px] text-app-text-light hover:bg-app-cream hover:text-app-text transition-colors rounded-lg mx-1">
                          <ShieldIcon size={15} className="text-app-text-light" strokeWidth={1.5} /> Admin Panel
                        </Link>
                      )}
                    </div>

                    {user && (
                      <div className="border-t border-app-border mt-1 pt-1">
                        <button
                          onClick={handleLogout}
                          className="flex items-center gap-3 px-4 py-2.5 text-[13px] text-app-error hover:bg-red-50 w-full transition-colors rounded-lg mx-1 font-medium"
                        >
                          <LogOutIcon size={15} strokeWidth={1.5} /> Logout
                        </button>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;