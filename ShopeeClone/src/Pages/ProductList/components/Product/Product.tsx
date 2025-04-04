import { Link } from 'react-router-dom'
import ProductRating from '~/Components/ProductRating'
import path from '~/constants/path'
import { Product as ProductType } from '~/types/product.type'
import { formatCurrency, formatNumberToSocialStyle, generateNameId } from '~/utils/utils'

interface Props {
  product: ProductType
}

export default function Product({ product }: Props) {
  return (
    <Link to={`${path.home}${generateNameId({ name: product.name, id: product._id })}`}>
      <div className='bg-white shadow rounded-sm hover:translate-y-[-0.0625rem] hover:shadow-sm duration-100 transition-transform overflow-hidden'>
        <div className='w-full pt-[100%] relative'>
          <img className='absolute top-0 left-0 bg-white w-full h-full object-cover' src={product.image} />
        </div>
        <div className='p-2 overflow-hidden'>
          <div className='min-h-[2rem] line-clamp-2 text-xs'>{product.name}</div>

          <div className='flex items-center mt-3 '>
            <div className='line-through max-w-[50%] text-gray-500 truncate'>
              <span className='text-xs'>₫</span>
              <span>{formatCurrency(product.price_before_discount)}</span>
            </div>
            <div className='max-w-[50%] text-orange truncate ml-1'>
              <span className='text-xs'>₫</span>
              <span>{formatCurrency(product.price)}</span>
            </div>
          </div>
          <div className='mt-3 flex items-center justify-end'>
            <ProductRating rating={product.rating} />
            <div className='ml-2 text-sm'>
              <span>{formatNumberToSocialStyle(product.sold)}</span>
              <span className='ml-1'>Đã bán</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
