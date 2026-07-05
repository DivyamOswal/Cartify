import { useNavigate } from "react-router-dom";
import {
  ArrowRightIcon,
  LeafIcon,
  MinusIcon,
  PlusIcon,
  ShoppingBagIcon,
  Trash2Icon,
  XIcon,
} from "lucide-react";
import { useCart } from "../context/CardContext";

const CartSidebar = () => {
  const currency = import.meta.env.VITE_CURRENCY_SYMBOL || "₹";
  const {
    items,
    updateQuantity,
    removeFromCart,
    cartTotal,
    isCartOpen,
    setIsCartOpen,
  } = useCart();
  const navigate = useNavigate();

  if (!isCartOpen) return null;

  const deliveryFee = cartTotal > 400 ? 0 : 75;
  const grandTotal = cartTotal + deliveryFee;
  const progressPct = Math.min((cartTotal / 400) * 100, 100);

  return (
    <>
      {/* Overlay */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="fixed inset-0 bg-black/30 z-50 backdrop-blur-[2px] transition-opacity"
      />

      {/* Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full max-w-[400px] bg-app-cream z-50 shadow-2xl flex flex-col animate-slide-in-right">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 bg-white border-b border-app-border shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="size-8 bg-app-green rounded-[8px] flex items-center justify-center shrink-0">
              <ShoppingBagIcon
                size={14}
                className="text-white"
                strokeWidth={2.2}
              />
            </div>
            <div>
              <h2 className="text-[14px] font-semibold text-app-text leading-tight">
                Your Cart
              </h2>
              <p className="text-[10.5px] text-app-text-light leading-tight">
                {items.length} {items.length === 1 ? "item" : "items"}
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="size-8 flex items-center justify-center rounded-xl hover:bg-app-cream transition-colors"
          >
            <XIcon className="size-4 text-app-text-muted" />
          </button>
        </div>
        {/* Free delivery progress bar */}
        {items.length > 0 && (
          <div className="px-4 py-3 bg-white border-b border-app-border shrink-0">
            <div className="flex justify-between items-center mb-2">
              {deliveryFee > 0 ? (
                <p className="text-[11.5px] text-app-text-muted font-medium">
                  Add{" "}
                  <span className="text-app-green font-bold">
                    {currency}
                    {(400 - cartTotal).toFixed(0)}
                  </span>{" "}
                  more for free delivery
                </p>
              ) : (
                <p className="text-[11.5px] text-app-green font-semibold">
                  🎉 You've unlocked free delivery!
                </p>
              )}
              <LeafIcon className="size-3.5 text-app-green-accent shrink-0 ml-2" />
            </div>

            {/* Track */}
            <div
              className="w-full h-1.5 rounded-full overflow-hidden"
              style={{ background: "#e2ddd4" }}
            >
              {/* Fill */}
              <div
                className="h-full rounded-full"
                style={{
                  width: `${progressPct}%`,
                  background: "#86c75a",
                  transition: "width 0.5s ease-out",
                }}
              />
            </div>
          </div>
        )}

        {/* Items scrollable */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center px-6">
              <div className="size-20 rounded-3xl bg-white border border-app-border flex items-center justify-center mb-5 shadow-sm">
                <ShoppingBagIcon
                  className="size-9 text-app-text-faint"
                  strokeWidth={1.25}
                />
              </div>
              <h3 className="font-serif text-xl text-app-text mb-2">
                Your cart is empty
              </h3>
              <p className="text-[13px] text-app-text-light font-light leading-relaxed mb-6">
                Add some fresh organic items to get started
              </p>
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  navigate("/products");
                }}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-app-green hover:bg-app-green-lighter text-white text-[13px] font-semibold rounded-xl transition-colors"
              >
                Browse Products <ArrowRightIcon className="size-3.5" />
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.product.id}
                className="flex gap-3 bg-white rounded-2xl p-3 border border-app-border shadow-[0_1px_4px_rgba(26,46,26,0.04)]"
              >
                {/* Image */}
                <div className="size-[68px] rounded-xl bg-app-cream border border-app-border flex items-center justify-center shrink-0 overflow-hidden">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-full h-full object-contain p-1.5"
                  />
                </div>
                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-1">
                    <h4 className="text-[13px] font-semibold text-app-text leading-snug line-clamp-2 flex-1">
                      {item.product.name}
                    </h4>
                    {item.product.isOrganic && (
                      <span className="text-[8.5px] font-bold text-[#3b6d11] bg-[#86c75a]/15 border border-[#86c75a]/30 px-1.5 py-0.5 rounded-full shrink-0 mt-0.5">
                        Organic
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-app-text-faint mt-0.5">
                    {currency}
                    {item.product.price.toFixed(0)} · {item.product.unit}
                  </p>
                  <div className="flex items-center justify-between mt-2.5">
                    {/* Quantity controls */}
                    <div className="flex items-center bg-app-cream border border-app-cream-darker rounded-lg overflow-hidden">
                      <button
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity - 1)
                        }
                        className="size-7 flex items-center justify-center hover:bg-app-cream-dark transition-colors"
                      >
                        <MinusIcon
                          className="size-3 text-app-text-muted"
                          strokeWidth={2.5}
                        />
                      </button>
                      <span className="text-[13px] font-bold text-app-text w-7 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity + 1)
                        }
                        className="size-7 flex items-center justify-center hover:bg-app-cream-dark transition-colors"
                      >
                        <PlusIcon
                          className="size-3 text-app-green"
                          strokeWidth={2.5}
                        />
                      </button>
                    </div>
                    {/* Price + delete */}
                    <div className="flex items-center gap-2">
                      <span className="text-[14px] font-bold text-app-text">
                        {currency}
                        {(item.product.price * item.quantity).toFixed(0)}
                      </span>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="size-6 flex items-center justify-center rounded-lg hover:bg-red-50 text-app-text-faint hover:text-app-error transition-colors"
                      >
                        <Trash2Icon className="size-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        {/* Footer */}
        {items.length > 0 && (
          <div className="shrink-0 bg-white border-t border-app-border p-4 space-y-3">
            <div className="flex justify-between text-[13px]">
              <span className="text-app-text-light">Subtotal</span>
              <span className="font-medium text-app-text">
                {currency}
                {cartTotal.toFixed(0)}
              </span>
            </div>

            <div className="flex justify-between text-[13px]">
              <span className="text-app-text-light">Delivery</span>
              <span className="font-medium">
                {deliveryFee === 0 ? (
                  <span className="text-app-success font-semibold">
                    Free 🎉
                  </span>
                ) : (
                  <span className="text-app-text">
                    {currency}
                    {deliveryFee}
                  </span>
                )}
              </span>
            </div>

            <div className="flex justify-between items-center border-t border-app-border pt-3">
              <span className="text-[14px] font-bold text-app-text">Total</span>
              <span className="text-[18px] font-bold text-app-green">
                {currency}
                {grandTotal.toFixed(0)}
              </span>
            </div>

            <button
              onClick={() => {
                setIsCartOpen(false);
                navigate("/checkout");
                window.scrollTo(0, 0);
              }}
              className="w-full py-3 bg-app-green hover:bg-app-green-lighter text-white text-[13.5px] font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 active:scale-[0.98]"
            >
              Proceed to Checkout
              <ArrowRightIcon className="size-4" />
            </button>

            <p className="text-[11px] text-app-text-faint text-center flex items-center justify-center gap-1">
              <LeafIcon className="size-3 text-app-green-accent" />
              Secure checkout · Free returns
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default CartSidebar;
