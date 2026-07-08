import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { EditIcon, LeafIcon, PackageIcon, PlusIcon, XIcon } from "lucide-react"
import type { Product } from "../../assets/types"
import Loading from "../../components/Loading"
import api from "../../config/api"
import toast from "react-hot-toast"

export default function AdminProducts() {
  const currency = import.meta.env.VITE_CURRENCY_SYMBOL || "₹"
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)


  const fetchProducts = async ()=>{
    try {
      const {data} = await api.get("/products")
      setProducts(data.products)
    } catch (error:any) {
      toast.error(error.response?.data?.message || error?.message)
    }finally{
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const handleMarkOutOfStock = async (id: string, name: string) => {
    if (!window.confirm(`Mark "${name}" as out of stock?`)) return
    try {
      await api.delete(`/products/${id}`)
      toast.success("Product marked as out of stock")
      fetchProducts()
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to update product")
    }
  }

  if (loading) return <Loading />

  const inStock    = products.filter((p) => p.stock > 0).length
  const outOfStock = products.length - inStock

  return (
    <div className="space-y-6">

      {/* Page header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[11px] font-semibold text-app-green-accent tracking-widest uppercase mb-1">
            Admin
          </p>
          <h1 className="font-serif text-2xl sm:text-3xl text-app-text leading-tight">
            Products
          </h1>
          <p className="text-[13px] text-app-text-light mt-1 font-light">
            {inStock} in stock
            {outOfStock > 0 && (
              <span className="text-app-error ml-1.5">· {outOfStock} out of stock</span>
            )}
          </p>
        </div>
        <Link
          to="/admin/products/new"
          className="shrink-0 flex items-center gap-1.5 px-4 py-2.5 bg-app-green hover:bg-app-green-lighter text-white text-[13px] font-semibold rounded-xl transition-colors active:scale-[0.98]"
        >
          <PlusIcon className="size-3.5" strokeWidth={2.5} />
          Add Product
        </Link>
      </div>

      {/* Table card */}
      <div className="bg-white border border-app-border rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left whitespace-nowrap">

            <thead>
              <tr className="bg-app-cream/60 border-b border-app-border">
                {["Product", "Category", "Price", "Stock", "Actions"].map((h) => (
                  <th
                    key={h}
                    className={`px-5 py-3 text-[10px] font-bold text-app-text-light uppercase tracking-widest ${h === "Actions" ? "text-right" : ""}`}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-app-border">
              {products.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-16 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <div className="size-12 rounded-2xl bg-app-cream border border-app-border flex items-center justify-center">
                        <PackageIcon className="size-5 text-app-text-faint" strokeWidth={1.5} />
                      </div>
                      <p className="text-[13px] text-app-text-faint font-light">No products yet</p>
                    </div>
                  </td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr
                    key={product.id}
                    className="hover:bg-app-cream/30 transition-colors"
                  >

                    {/* Product */}
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="size-11 rounded-xl bg-app-cream border border-app-border flex items-center justify-center shrink-0 overflow-hidden">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-contain p-1"
                          />
                        </div>
                        <div>
                          <p className="text-[13px] font-semibold text-app-text leading-tight">
                            {product.name}
                          </p>
                          {product.isOrganic && (
                            <span className="inline-flex items-center gap-0.5 text-[9.5px] font-bold text-[#3b6d11]">
                              <LeafIcon className="size-2.5" strokeWidth={2} /> Organic
                            </span>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="px-5 py-3.5">
                      <span className="text-[12px] text-app-text-muted capitalize">
                        {product.category || "Uncategorized"}
                      </span>
                    </td>

                    {/* Price */}
                    <td className="px-5 py-3.5">
                      <div>
                        <span className="text-[13px] font-bold text-app-text">
                          {currency}{product.price.toFixed(0)}
                        </span>
                        {product.originalPrice && product.originalPrice > product.price && (
                          <p className="text-[11px] text-app-text-faint line-through">
                            {currency}{product.originalPrice.toFixed(0)}
                          </p>
                        )}
                      </div>
                    </td>

                    {/* Stock */}
                    <td className="px-5 py-3.5">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10.5px] font-bold border ${
                        product.stock > 10
                          ? "bg-green-50 text-green-700 border-green-200"
                          : product.stock > 0
                          ? "bg-orange-50 text-app-orange border-orange-200"
                          : "bg-red-50 text-app-error border-red-200"
                      }`}>
                        {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-3.5">
                      <div className="flex items-center justify-end gap-1.5">
                        <Link
                          to={`/admin/products/${product.id}/edit`}
                          className="size-8 flex items-center justify-center rounded-xl text-app-text-faint hover:text-app-green hover:bg-app-cream border border-transparent hover:border-app-border transition-all"
                          title="Edit product"
                        >
                          <EditIcon className="size-3.5" strokeWidth={1.75} />
                        </Link>
                        <button
                          onClick={() => handleMarkOutOfStock(product.id, product.name)}
                          title="Mark out of stock"
                          className="size-8 flex items-center justify-center rounded-xl text-app-text-faint hover:text-app-error hover:bg-red-50 border border-transparent hover:border-red-200 transition-all"
                        >
                          <XIcon className="size-3.5" strokeWidth={2} />
                        </button>
                      </div>
                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  )
}