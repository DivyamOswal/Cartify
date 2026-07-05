import { useEffect, useState } from "react"
import type { Product } from "../../types"
import { Link } from "react-router-dom"
import { ArrowRightIcon } from "lucide-react"
import ProductCard from "../ProductCard"
import api from "../../config/api"
import toast from "react-hot-toast"

const PopularProducts = () => {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    api.get('/products?sort=rating').then(({data})=>{
      setProducts(data.products)
    }).catch((error: any)=>{
      toast.error(error.response.data.message || error?.message)
    })
  }, [])

  return (
    <section className="pb-16">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-[11px] font-semibold text-[#86c75a] tracking-widest uppercase mb-2">
              Trending Now
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1a2e1a] leading-tight">
              Popular Products
            </h2>
            <p className="text-[13.5px] text-[#a09890] mt-2 font-light">
              Top-rated picks this season
            </p>
          </div>
          <Link
            to="/products"
            className="hidden sm:inline-flex items-center gap-1 text-[13px] font-medium text-[#3b6d11] hover:text-[#2d4a2d] transition-colors"
          >
            View all <ArrowRightIcon className="size-3.5" />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 xl:gap-4">
          {products.slice(0, 10).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Mobile view all */}
        <div className="sm:hidden mt-6 text-center">
          <Link
            to="/products"
            className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[#3b6d11] hover:text-[#2d4a2d] transition-colors"
          >
            View all products <ArrowRightIcon className="size-3.5" />
          </Link>
        </div>

      </div>
    </section>
  )
}

export default PopularProducts