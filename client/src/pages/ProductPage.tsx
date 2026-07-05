import { Link, useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { dummyProducts } from "../assets/assets"
import Loading from "../components/Loading"
import {
  ArrowLeftIcon,
  HomeIcon,
  LeafIcon,
  MinusIcon,
  PackageIcon,
  PlusIcon,
  ShoppingCartIcon,
  StarIcon,
  TruckIcon,
  ZapIcon,
} from "lucide-react"
import type { Product } from "../types"
import ProductCard from "../components/ProductCard"
import { useCart } from "../context/CardContext"

const TABS = ["Description", "Nutrition", "Reviews"] as const
type Tab = typeof TABS[number]

const ProductPage = () => {
  const currency = import.meta.env.VITE_CURRENCY_SYMBOL || "₹"
  const { id } = useParams()
  const navigate = useNavigate()
  const { items, addToCart, updateQuantity, removeFromCart } = useCart()

  const [product, setProduct] = useState<Product | null>(null)
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [localQuantity, setLocalQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState<Tab>("Description")

  useEffect(() => {
    setLoading(true)
    setLocalQuantity(1)
    setActiveTab("Description")
    window.scrollTo(0, 0)
    const found = dummyProducts.find((p) => p.id === id)
    setProduct(found ?? null)
    setRelatedProducts(
      dummyProducts
        .filter((p) => p.id !== id && p.category === found?.category)
        .slice(0, 4)
    )
    setLoading(false)
  }, [id])

  if (loading) return <Loading />
  if (!product) return (
    <div className="min-h-screen bg-app-cream flex items-center justify-center">
      <div className="text-center">
        <h2 className="font-serif text-2xl text-app-text mb-2">Product not found</h2>
        <button onClick={() => navigate("/products")} className="text-[13px] text-app-green hover:underline">
          Browse all products
        </button>
      </div>
    </div>
  )

  const cartItem = items.find((item) => item.product.id === product.id)
  const inCart = !!cartItem
  const displayQuantity = inCart ? cartItem.quantity : localQuantity

  const hasDiscount = product.discount > 0
  const discountedPrice = hasDiscount
    ? product.price - (product.price * product.discount) / 100
    : product.price

  const categoryLabel = product.category.replace(/-/g, " ")

  const handleAdd = () => {
    if (inCart) updateQuantity(product.id, cartItem.quantity + 1)
    else addToCart(product, localQuantity)
  }

  const handleMinus = () => {
    if (inCart) {
      if (cartItem.quantity <= 1) removeFromCart(product.id)
      else updateQuantity(product.id, cartItem.quantity - 1)
    } else {
      setLocalQuantity((q) => Math.max(1, q - 1))
    }
  }

  const handlePlus = () => {
    if (inCart) updateQuantity(product.id, cartItem.quantity + 1)
    else setLocalQuantity((q) => q + 1)
  }

  return (
    <div className="min-h-screen bg-app-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-[13px] text-app-text-muted mb-4">
          <Link to="/" className="hover:text-app-green transition-colors">
            <HomeIcon className="size-3.5" />
          </Link>
          <span className="text-app-text-faint">/</span>
          <Link to="/products" className="hover:text-app-green transition-colors">Products</Link>
          <span className="text-app-text-faint">/</span>
          <Link to={`/products?category=${product.category}`} className="hover:text-app-green transition-colors capitalize">
            {categoryLabel}
          </Link>
          <span className="text-app-text-faint">/</span>
          <span className="text-app-green font-medium truncate max-w-[160px]">{product.name}</span>
        </nav>

        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="mb-5 flex items-center gap-1.5 text-[13px] text-app-text-muted hover:text-app-green transition-colors"
        >
          <ArrowLeftIcon className="size-3.5" /> Back
        </button>

        {/* Main card */}
        <div className="bg-white border border-app-border rounded-3xl overflow-hidden mb-8">
          <div className="grid md:grid-cols-2">

            {/* Image panel */}
            <div className="relative flex items-center justify-center bg-app-cream p-10 md:p-14 min-h-[360px] border-b md:border-b-0 md:border-r border-app-border">
              <div className="absolute top-4 left-4 flex flex-col gap-1.5">
                {product.isOrganic && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 text-[10px] font-bold text-[#3b6d11] bg-[#86c75a]/15 border border-[#86c75a]/40 rounded-full">
                    <LeafIcon className="size-2.5" /> Organic
                  </span>
                )}
                {hasDiscount && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 text-[10px] font-bold text-white bg-app-orange rounded-full">
                    <ZapIcon className="size-2.5 fill-white" /> {product.discount}% OFF
                  </span>
                )}
              </div>
              <img
                src={product.image}
                alt={product.name}
                className="max-h-[280px] w-auto object-contain"
              />
            </div>

            {/* Info panel */}
            <div className="p-7 md:p-10 flex flex-col">

              {/* Category + unit */}
              <div className="flex items-center gap-2 mb-2.5">
                <span className="text-[10px] font-bold text-app-text-light uppercase tracking-widest capitalize">
                  {categoryLabel}
                </span>
                <span className="text-app-text-faint text-[11px]">·</span>
                <span className="text-[10px] text-app-text-faint bg-app-cream px-2 py-0.5 rounded-md">
                  {product.unit}
                </span>
              </div>

              {/* Name */}
              <h1 className="font-serif text-[26px] md:text-[30px] text-app-text leading-tight mb-3">
                {product.name}
              </h1>

              {/* Rating */}
              {product.rating > 0 && (
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <StarIcon
                        key={star}
                        className={`size-[14px] ${
                          star <= Math.round(product.rating)
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-app-cream-darker fill-app-cream-darker"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-[12.5px] font-semibold text-app-text-muted">
                    {product.rating.toFixed(1)}
                  </span>
                  <span className="text-[12.5px] text-app-text-faint">
                    ({product.reviewCount} reviews)
                  </span>
                </div>
              )}

              {/* Price */}
              <div className="flex items-baseline gap-2.5 mb-4">
                <span className="text-[30px] font-bold text-app-text leading-none">
                  {currency}{discountedPrice.toFixed(0)}
                </span>
                {hasDiscount && (
                  <>
                    <span className="text-[16px] text-app-text-faint line-through">
                      {currency}{product.price}
                    </span>
                    <span className="text-[11px] font-bold text-app-success bg-green-50 px-2 py-0.5 rounded-lg">
                      Save {currency}{(product.price - discountedPrice).toFixed(0)}
                    </span>
                  </>
                )}
              </div>

              <div className="h-px bg-app-border mb-5" />

              {/* Qty + CTA */}
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center bg-app-cream border border-app-cream-darker rounded-xl overflow-hidden shrink-0">
                  <button
                    onClick={handleMinus}
                    className="size-10 flex items-center justify-center hover:bg-app-cream-dark transition-colors"
                  >
                    <MinusIcon className="size-3.5 text-app-text-muted" strokeWidth={2.5} />
                  </button>
                  <span className="text-[15px] font-bold text-app-text w-10 text-center">
                    {displayQuantity}
                  </span>
                  <button
                    onClick={handlePlus}
                    className="size-10 flex items-center justify-center hover:bg-app-cream-dark transition-colors"
                  >
                    <PlusIcon className="size-3.5 text-app-green" strokeWidth={2.5} />
                  </button>
                </div>
                <button
                  onClick={handleAdd}
                  disabled={product.stock === 0}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-[13.5px] font-semibold rounded-xl transition-all active:scale-[0.98] disabled:opacity-50
                    ${inCart
                      ? "bg-app-cream border-[1.5px] border-app-green text-app-green"
                      : "bg-app-green hover:bg-app-green-lighter text-white"
                    }`}
                >
                  <ShoppingCartIcon className="size-4" strokeWidth={2} />
                  {product.stock === 0 ? "Out of Stock" : inCart ? "Add More" : "Add to Cart"}
                </button>
              </div>

              {/* Low stock */}
              {product.stock > 0 && product.stock <= 5 && (
                <p className="text-[11.5px] font-semibold text-app-orange flex items-center gap-1.5 mb-4">
                  <span className="size-1.5 rounded-full bg-app-orange inline-block" />
                  Only {product.stock} left in stock
                </p>
              )}

              {/* Trust badges */}
              <div className="flex flex-wrap gap-3 mb-6">
                <span className="flex items-center gap-1.5 text-[11.5px] text-app-text-muted">
                  <TruckIcon className="size-3.5 text-app-green-accent" strokeWidth={1.75} />
                  Free delivery over ₹400
                </span>
                <span className="flex items-center gap-1.5 text-[11.5px] text-app-text-muted">
                  <PackageIcon className="size-3.5 text-app-green-accent" strokeWidth={1.75} />
                  Easy returns
                </span>
                {product.isOrganic && (
                  <span className="flex items-center gap-1.5 text-[11.5px] text-app-text-muted">
                    <LeafIcon className="size-3.5 text-app-green-accent" strokeWidth={1.75} />
                    100% Organic
                  </span>
                )}
              </div>

              {/* Tabs */}
              <div className="border-t border-app-border">
                <div className="flex gap-0 -mb-px">
                  {TABS.map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-4 py-3 text-[13px] font-medium border-b-2 transition-colors
                        ${activeTab === tab
                          ? "border-app-green text-app-text"
                          : "border-transparent text-app-text-muted hover:text-app-text"
                        }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
                <div className="pt-4 pb-1 text-[13.5px] text-app-text-light font-light leading-relaxed min-h-[60px]">
                  {activeTab === "Description" && (
                    <p>{product.description}</p>
                  )}
                  {activeTab === "Nutrition" && (
                    <p>Nutritional information not available for this product. Please check the product packaging for detailed nutritional facts.</p>
                  )}
                  {activeTab === "Reviews" && (
                    <p className="flex items-center gap-2">
                      <StarIcon className="size-4 text-yellow-400 fill-yellow-400" />
                      <span className="font-semibold text-app-text">{product.rating.toFixed(1)}</span>
                      <span className="text-app-text-faint"> based on {product.reviewCount} reviews</span>
                    </p>
                  )}
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <div className="mb-6">
              <p className="text-[11px] font-semibold text-app-green-accent tracking-widest uppercase mb-1.5">
                You may also like
              </p>
              <h2 className="font-serif text-2xl sm:text-3xl text-app-text leading-tight">
                Related Products
              </h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 xl:gap-4">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  )
}

export default ProductPage