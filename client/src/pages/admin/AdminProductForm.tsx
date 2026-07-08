import { useState, useEffect } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import { ArrowLeftIcon, ImageIcon, Loader2Icon, PackageIcon } from "lucide-react"
import { categoriesData } from "../../assets/assets"
import Loading from "../../components/Loading"
import api from "../../config/api"
import toast from "react-hot-toast"

const inputClass = "w-full px-4 py-[10px] text-[13.5px] bg-app-cream border-[1.5px] border-app-cream-darker rounded-xl focus:border-app-green-light focus:bg-white text-app-text placeholder:text-app-text-faint outline-none transition-all"
const labelClass = "block text-[11px] font-bold text-app-text-light uppercase tracking-widest mb-1.5"

export default function AdminProductForm() {
  const { id } = useParams()
  const isEdit = Boolean(id)
  const navigate = useNavigate()

  const [loading, setLoading] = useState(isEdit)
  const [saving, setSaving] = useState(false)
  const [imageFile, setImageFile] = useState<File | null>(null)

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    originalPrice: "",
    image: "",
    category: "",
    unit: "",
    stock: "",
    isOrganic: false,
  })

  useEffect(() => {
    const fetchData = async ()=>{
      try {
        if (isEdit) {
        const {data: prodData} = await api.get(`/products/${id}`)
        const p = prodData.product
        setFormData({
          name: p.name,
          description: p.description,
          price: p.price.toString(),
          originalPrice: p.originalPrice? p.originalPrice.toString(): "",
          image: p.image,
          category: p.category,
          unit: p.unit,
          stock: p.stock.toString(),
          isOrganic: p.isOrganic
        })
    }
      } catch (error:any) {
        toast.error(error.response?.data?.message || "Failed to load data")
      }finally{
        setLoading(false)
      }
    }
    fetchData()
  }, [id, isEdit])

  const handleSubmit = async (e: React.SubmitEvent) => { 
    e.preventDefault()
    setSaving(true)
    try {
      let finalImageUrl = formData.image

      if(imageFile){
        const formDataUpload = new FormData()
        formDataUpload.append("image", imageFile)
        const {data} = await api.post("/upload", formDataUpload)
        finalImageUrl = data.url
      }
      if(!finalImageUrl){
        toast.error("Please upload a product image")
        setSaving(false)
        return
      }

      const payload = {
        ...formData,
        image: finalImageUrl,
        price: Number(formData.price),
        originalPrice: formData.originalPrice ? Number (formData.originalPrice) : 0,
        stock: Number(formData.stock)
      }
      if(isEdit){
        await api.put(`/products/${id}`, payload)
        toast.success("Product updated successfully")
      }else{
        await api.post("/products", payload)
        toast.success("Product created successfully")
      }navigate('/admin/products')
    } catch (error:any) {
      toast.error(error.response?.data?.message || "Failed to save product")
    }finally{
      setSaving(false)
    }
  }

  const set = (key: string, value: any) =>
    setFormData((prev) => ({ ...prev, [key]: value }))

  const imagePreview = imageFile
    ? URL.createObjectURL(imageFile)
    : formData.image || null

  if (loading) return <Loading />

  return (
    <div className="space-y-6">

      {/* Page header */}
      <div className="flex items-center gap-4">
        <Link
          to="/admin/products"
          className="size-9 flex items-center justify-center bg-white border border-app-border rounded-xl hover:bg-app-cream transition-colors"
        >
          <ArrowLeftIcon className="size-4 text-app-text-muted" />
        </Link>
        <div>
          <p className="text-[11px] font-semibold text-app-green-accent tracking-widest uppercase mb-0.5">
            Admin · Products
          </p>
          <h1 className="font-serif text-2xl text-app-text leading-tight">
            {isEdit ? "Edit Product" : "Add New Product"}
          </h1>
        </div>
      </div>

      {/* Form card */}
      <div className="bg-white border border-app-border rounded-2xl overflow-hidden">

        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-6">

            {/* Image upload */}
            <div>
              <p className={labelClass}>Product Image</p>
              <div className="flex items-start gap-4">

                {/* Preview */}
                <div className="size-20 rounded-xl bg-app-cream border-[1.5px] border-app-cream-darker flex items-center justify-center shrink-0 overflow-hidden">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-full object-contain p-1"
                    />
                  ) : (
                    <ImageIcon className="size-6 text-app-text-faint" strokeWidth={1.5} />
                  )}
                </div>

                {/* File input */}
                <div className="flex-1">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                    className="w-full text-[13px] text-app-text-muted bg-app-cream border-[1.5px] border-app-cream-darker rounded-xl px-4 py-[10px] outline-none transition-all cursor-pointer
                      file:mr-3 file:py-1.5 file:px-4 file:rounded-lg file:border-0
                      file:text-[12px] file:font-semibold file:bg-app-green file:text-white
                      hover:file:bg-app-green-lighter"
                  />
                  <p className="text-[11px] text-app-text-faint mt-1.5 font-light">
                    PNG, JPG or WEBP · Max 5MB
                  </p>
                </div>
              </div>
            </div>

            <div className="h-px bg-app-border" />

            {/* Name + Category */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className={labelClass}>Product Name</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Organic Broccoli"
                  value={formData.name}
                  onChange={(e) => set("name", e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Category</label>
                <select
                  required
                  value={formData.category}
                  onChange={(e) => set("category", e.target.value)}
                  className={inputClass}
                >
                  <option value="">Select a category</option>
                  {categoriesData.map((c) => (
                    <option key={c.slug} value={c.slug}>{c.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Price + Original Price */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className={labelClass}>Price (₹)</label>
                <input
                  required
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                  value={formData.price}
                  onChange={(e) => set("price", e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>
                  Original Price (₹)
                  <span className="ml-1.5 text-[9px] font-medium text-app-text-faint normal-case tracking-normal">
                    optional - for discount display
                  </span>
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                  value={formData.originalPrice}
                  onChange={(e) => set("originalPrice", e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>

            {/* Unit + Stock */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className={labelClass}>Unit</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. 500g, 1kg, piece"
                  value={formData.unit}
                  onChange={(e) => set("unit", e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Stock Quantity</label>
                <input
                  required
                  type="number"
                  min="0"
                  placeholder="0"
                  value={formData.stock}
                  onChange={(e) => set("stock", e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className={labelClass}>Description</label>
              <textarea
                required
                rows={4}
                placeholder="Describe the product - freshness, origin, usage tips…"
                value={formData.description}
                onChange={(e) => set("description", e.target.value)}
                className={`${inputClass} resize-none`}
              />
            </div>

            {/* Organic toggle */}
            <div>
              <label className="flex items-center gap-3 cursor-pointer group w-fit">
                <div className="relative">
                  <input
                    type="checkbox"
                    id="isOrganic"
                    checked={formData.isOrganic}
                    onChange={(e) => set("isOrganic", e.target.checked)}
                    className="sr-only"
                  />
                  <div className={`size-5 rounded-md border-[1.5px] flex items-center justify-center transition-all
                    ${formData.isOrganic
                      ? "bg-app-green border-app-green"
                      : "bg-app-cream border-app-cream-darker group-hover:border-app-green-light"
                    }`}
                  >
                    {formData.isOrganic && (
                      <svg className="size-3 text-white" viewBox="0 0 12 12" fill="none">
                        <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </div>
                </div>
                <div>
                  <p className="text-[13px] font-semibold text-app-text group-hover:text-app-green transition-colors">
                    Organic Product
                  </p>
                  <p className="text-[11px] text-app-text-faint font-light">
                    Shows an organic badge on the product card
                  </p>
                </div>
              </label>
            </div>

          </div>

          {/* Footer */}
          <div className="flex items-center justify-between px-6 py-4 border-t border-app-border bg-app-cream/30">
            <Link
              to="/admin/products"
              className="text-[13px] font-medium text-app-text-muted hover:text-app-text transition-colors"
            >
              ← Cancel
            </Link>
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 px-6 py-2.5 bg-app-green hover:bg-app-green-lighter text-white text-[13.5px] font-semibold rounded-xl transition-colors disabled:opacity-50 active:scale-[0.98]"
            >
              {saving ? (
                <><Loader2Icon className="size-4 animate-spin" /> Saving…</>
              ) : (
                <><PackageIcon className="size-4" strokeWidth={1.75} />
                  {isEdit ? "Update Product" : "Create Product"}
                </>
              )}
            </button>
          </div>

        </form>
      </div>
    </div>
  )
}