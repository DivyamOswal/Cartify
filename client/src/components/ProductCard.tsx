import { useNavigate } from "react-router-dom"
import type { Product } from "../types"
import { PlusIcon, StarIcon } from "lucide-react"
import { useCart } from "../context/CardContext"

interface Props {
  product: Product
}

const ProductCard = ({ product }: Props) => {
  const currency = import.meta.env.VITE_CURRENCY_SYMBOL || "₹"
  const { addToCart } = useCart()
  const navigate = useNavigate()

  const hasDiscount = product.discount > 0
  const discountedPrice = hasDiscount
    ? product.price - (product.price * product.discount) / 100
    : product.price

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation()
    addToCart(product)
  }

  const isOutOfStock = product.stock === 0
  const isLowStock = product.stock > 0 && product.stock <= 5

  return (
    <div
      onClick={() => !isOutOfStock && navigate(`/products/${product.id}`)}
      className={`bg-white border border-app-border rounded-2xl overflow-hidden transition-all duration-200 group flex flex-col animate-fade-in
        ${isOutOfStock ? "cursor-not-allowed opacity-60" : "cursor-pointer hover:border-app-cream-darker hover:shadow-[0_6px_24px_rgba(26,46,26,0.09)]"}`}
    >
      {/* Image zone */}
      <div className="relative bg-app-cream aspect-square overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className={`w-full h-full object-contain p-4 transition-transform duration-300 ${!isOutOfStock ? "group-hover:scale-[1.06]" : ""}`}
        />

        {/* Top-left badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1">
          {product.isOrganic && (
            <span className="text-[9px] font-bold text-[#3b6d11] bg-[#86c75a]/20 border border-[#86c75a]/40 px-2 py-0.5 rounded-full tracking-wide">
              Organic
            </span>
          )}
          {hasDiscount && (
            <span className="text-[9px] font-bold text-white bg-app-orange px-2 py-0.5 rounded-full">
              -{product.discount}%
            </span>
          )}
        </div>

        {/* Add to cart bottom right, appears on hover */}
        {!isOutOfStock && (
          <button
            onClick={handleAddToCart}
            className="absolute bottom-2.5 right-2.5 size-8 rounded-xl bg-app-green text-white flex items-center justify-center opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all duration-200 shadow-[0_2px_8px_rgba(26,46,26,0.25)]"
            aria-label="Add to cart"
          >
            <PlusIcon className="size-4" strokeWidth={2.5} />
          </button>
        )}

        {/* Out of stock overlay */}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
            <span className="text-[11px] font-semibold text-app-text-light bg-white border border-app-border px-3 py-1 rounded-full shadow-sm">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-3 flex flex-col flex-1">

        {/* Category + unit row */}
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[9.5px] font-semibold text-app-text-light uppercase tracking-widest">
            {product.category}
          </span>
          <span className="text-[9.5px] text-app-text-faint bg-app-cream px-1.5 py-0.5 rounded-md">
            {product.unit}
          </span>
        </div>

        {/* Name */}
        <h3 className="text-[13px] font-semibold text-app-text leading-snug line-clamp-2 flex-1 mb-2">
          {product.name}
        </h3>

        {/* Rating */}
        {product.rating > 0 && (
          <div className="flex items-center gap-1 mb-2">
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <StarIcon
                  key={i}
                  className={`size-2.5 ${
                    i < Math.round(product.rating)
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-app-cream-darker fill-app-cream-darker"
                  }`}
                />
              ))}
            </div>
            <span className="text-[10.5px] font-medium text-app-text-muted">
              {product.rating.toFixed(1)}
            </span>
            <span className="text-[10.5px] text-app-text-faint">
              ({product.reviewCount})
            </span>
          </div>
        )}

        {/* Divider */}
        <div className="h-px bg-app-border mb-2.5" />

        {/* Price + CTA row */}
        <div className="flex items-center justify-between mt-auto">
          <div className="flex flex-col">
            <span className="text-[15px] font-bold text-app-text leading-tight">
              {currency}{discountedPrice.toFixed(0)}
            </span>
            {hasDiscount && (
              <span className="text-[10.5px] text-app-text-faint line-through leading-tight">
                {currency}{product.price}
              </span>
            )}
          </div>

          {!isOutOfStock ? (
            <button
              onClick={handleAddToCart}
              className="flex items-center gap-1 px-3 py-1.5 bg-app-green hover:bg-app-green-lighter text-white text-[11px] font-semibold rounded-lg transition-colors"
            >
              <PlusIcon className="size-3" strokeWidth={3} />
              Add
            </button>
          ) : (
            <span className="text-[10px] font-medium text-app-text-faint">
              Unavailable
            </span>
          )}
        </div>

        {/* Low stock */}
        {isLowStock && (
          <p className="text-[10px] font-semibold text-app-orange mt-1.5 flex items-center gap-1">
            <span className="size-1.5 rounded-full bg-app-orange inline-block" />
            Only {product.stock} left
          </p>
        )}

      </div>
    </div>
  )
}

export default ProductCard