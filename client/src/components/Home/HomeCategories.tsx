import { categoriesData } from '../../assets/assets'
import { Link } from 'react-router-dom'

const HomeCategories = () => {
  return (
    <section className='py-10'>
      <div className='max-w-7xl mx-auto'>

        {/* Header */}
        <div className='flex items-end justify-between mb-10'>
          <div>
            <p className='text-[11px] font-semibold text-[#86c75a] tracking-widest uppercase mb-2'>
              Shop by Category
            </p>
            <h2 className='font-serif text-3xl sm:text-4xl text-[#1a2e1a] leading-tight'>
              Browse Categories
            </h2>
            <p className='text-[13.5px] text-[#a09890] mt-2 font-light'>
              Find exactly what you need
            </p>
          </div>
          <Link
            to='/products'
            className='hidden sm:inline-flex text-[13px] font-medium text-[#3b6d11] hover:text-[#2d4a2d] transition-colors'
          >
            View all →
          </Link>
        </div>
        {/* Scrollable row */}
        <div className='flex items-start gap-4 overflow-x-auto no-scrollbar pb-3'>
          {categoriesData.map((cat) => (
            <Link
              key={cat.slug}
              to={`/products?category=${cat.slug}`}
              className='group flex flex-col items-center gap-3 shrink-0'
            >
              {/* Image tile */}
              <div className='w-[120px] h-[120px] sm:w-[140px] sm:h-[140px] rounded-2xl bg-[#eee9e0] group-hover:bg-[#e2ddd4] overflow-hidden ring-[1.5px] ring-transparent group-hover:ring-[#86c75a]/50 transition-all duration-200 flex items-center justify-center'>
                <img
                  src={cat.image}
                  alt={cat.name}
                  className='w-[80%] h-[80%] object-contain group-hover:scale-105 transition-transform duration-300'
                />
              </div>
              {/* Label */}
              <span className='text-[12.5px] font-medium text-[#3d3830] group-hover:text-[#1a2e1a] text-center leading-tight transition-colors duration-200 w-[120px] sm:w-[140px]'>
                {cat.name}
              </span>
            </Link>
          ))}
        </div>

      </div>
    </section>
  )
}

export default HomeCategories