import { useNavigate } from "react-router-dom"
import { MinusIcon, PlusIcon, ShoppingBagIcon, Trash2Icon, XIcon } from "lucide-react"
import { useCart } from "../context/CardContext"

const CartSidebar = () => {
  const currency = import.meta.env.VITE_CURRENCY_SYMBOL || "₹"
  const { items, updateQuantity, removeFromCart, cartTotal, isCartOpen, setIsCartOpen } = useCart()
  const navigate = useNavigate()

  if (!isCartOpen) return null

  const deliveryFee = cartTotal > 400 ? 0 : 75
  const grandTotal = cartTotal + deliveryFee

  return (
    <>
      {/* Overlay */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="fixed inset-0 bg-black/40 z-50 backdrop-blur-[1px] transition-opacity"
      />
      {/* Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 shadow-2xl flex flex-col animate-slide-in-right">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-app-border shrink-0">
          <div className="flex items-center gap-2">
            <ShoppingBagIcon className="size-5 text-app-green" strokeWidth={1.75} />
            <h2 className="text-[15px] font-semibold text-app-text">Your Cart</h2>
            <span className="px-2 py-0.5 text-[11px] font-bold bg-app-cream text-app-text-muted rounded-full">
              {items.length}
            </span>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="size-8 flex items-center justify-center rounded-xl hover:bg-app-cream transition-colors"
          >
            <XIcon className="size-4 text-app-text-muted" />
          </button>
        </div>
        {/* Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="size-16 rounded-2xl bg-app-cream flex items-center justify-center mb-4">
                <ShoppingBagIcon className="size-8 text-app-text-faint" strokeWidth={1.5} />
              </div>
              <h3 className="text-[15px] font-semibold text-app-text mb-1">Your cart is empty</h3>
              <p className="text-[13px] text-app-text-light font-light">Add some fresh items to get started</p>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.product._id} className="flex gap-3 bg-app-cream rounded-xl p-3 border border-app-border/50">

                {/* Image */}
                <div className="size-16 rounded-lg bg-white border border-app-border flex items-center justify-center shrink-0 overflow-hidden">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-full h-full object-contain p-1"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h4 className="text-[13px] font-semibold text-app-text truncate leading-snug">
                    {item.product.name}
                  </h4>
                  <p className="text-[11px] text-app-text-light mt-0.5">
                    {currency}{item.product.price.toFixed(0)} / {item.product.unit}
                  </p>

                  <div className="flex items-center justify-between mt-2.5">
                    {/* Quantity controls */}
                    <div className="flex items-center gap-1.5 bg-white border border-app-border rounded-lg p-0.5">
                      <button
                        onClick={() => updateQuantity(item.product._id, item.quantity - 1)}
                        className="size-6 rounded-md flex items-center justify-center hover:bg-app-cream transition-colors"
                      >
                        <MinusIcon className="size-3 text-app-text-muted" />
                      </button>
                      <span className="text-[13px] font-bold text-app-text w-5 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
                        className="size-6 rounded-md flex items-center justify-center hover:bg-app-cream transition-colors"
                      >
                        <PlusIcon className="size-3 text-app-text-muted" />
                      </button>
                    </div>

                    {/* Price + delete */}
                    <div className="flex items-center gap-2">
                      <span className="text-[13px] font-bold text-app-text">
                        {currency}{(item.product.price * item.quantity).toFixed(0)}
                      </span>
                      <button
                        onClick={() => removeFromCart(item.product._id)}
                        className="size-6 flex items-center justify-center rounded-md hover:bg-red-50 text-app-text-faint hover:text-app-error transition-colors"
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
          <div className="p-4 border-t border-app-border space-y-2.5 shrink-0 bg-white">

            <div className="flex justify-between text-[13px]">
              <span className="text-app-text-light">Subtotal</span>
              <span className="font-medium text-app-text">{currency}{cartTotal.toFixed(0)}</span>
            </div>

            <div className="flex justify-between text-[13px]">
              <span className="text-app-text-light">Delivery</span>
              <span className="font-medium">
                {deliveryFee === 0
                  ? <span className="text-app-success font-semibold">Free</span>
                  : `${currency}${deliveryFee.toFixed(0)}`
                }
              </span>
            </div>

            {deliveryFee > 0 && (
              <p className="text-[11.5px] text-app-text-faint text-center bg-app-cream rounded-lg py-1.5">
                Add {currency}{(400 - cartTotal).toFixed(0)} more for free delivery
              </p>
            )}

            <div className="flex justify-between text-[14px] font-bold border-t border-app-border pt-2.5">
              <span className="text-app-text">Total</span>
              <span className="text-app-text">{currency}{grandTotal.toFixed(0)}</span>
            </div>

            <button
              onClick={() => {
                setIsCartOpen(false)
                navigate('/checkout')
                window.scrollTo(0, 0)
              }}
              className="w-full py-3 bg-app-green hover:bg-app-green-lighter text-white text-[13.5px] font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 active:scale-[0.98]"
            >
              Proceed to Checkout
            </button>

          </div>
        )}
      </div>
    </>
  )
}

export default CartSidebar