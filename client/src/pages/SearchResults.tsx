import { useEffect, useState } from "react"
import type { Product } from "../types"
import { Link, useSearchParams } from "react-router-dom"
import { dummyProducts } from "../assets/assets"
import { HomeIcon, SearchIcon, SearchXIcon } from "lucide-react"
import Loading from "../components/Loading"
import ProductCard from "../components/ProductCard"

const SearchResults = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [searchParams] = useSearchParams()
  const query = searchParams.get("q") || ""

  useEffect(() => {
    if (!query) {
      setProducts([])
      setLoading(false)
      return
    }
    setLoading(true)
    const results = dummyProducts.filter((p: any) =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.category?.toLowerCase().includes(query.toLowerCase())
    )
    setProducts(results)
    setLoading(false)
  }, [query])

  return (
    <div className="min-h-screen bg-app-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-[13px] text-app-text-muted mb-6">
          <Link to="/" className="hover:text-app-green transition-colors">
            <HomeIcon className="size-3.5" />
          </Link>
          <span className="text-app-text-faint">/</span>
          <span className="text-app-green font-medium">Search Results</span>
        </nav>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <SearchIcon className="size-4 text-app-green-accent" strokeWidth={1.75} />
            <p className="text-[11px] font-semibold text-app-green-accent tracking-widest uppercase">
              Search
            </p>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl text-app-text leading-tight">
            Results for "{query}"
          </h1>
          <p className="text-[13px] text-app-text-light mt-1.5 font-light">
            {loading
              ? "Searching…"
              : `${products.length} ${products.length === 1 ? "item" : "items"} found`
            }
          </p>
        </div>

        {/* Results */}
        {loading ? (
          <Loading />
        ) : products.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="size-16 rounded-2xl bg-white border border-app-border flex items-center justify-center mb-4 shadow-sm">
              <SearchXIcon className="size-7 text-app-text-faint" strokeWidth={1.5} />
            </div>
            <h3 className="font-serif text-xl text-app-text mb-2">No results found</h3>
            <p className="text-[13px] text-app-text-light font-light mb-6 max-w-sm">
              We couldn't find any products matching{" "}
              <span className="font-semibold text-app-text-muted">"{query}"</span>.
              Try a different search term or browse our categories.
            </p>
            <Link
              to="/products"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-app-green hover:bg-app-green-lighter text-white text-[13px] font-semibold rounded-xl transition-colors"
            >
              Browse All Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 xl:gap-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

      </div>
    </div>
  )
}

export default SearchResults