import useQueryParams from '~/hooks/useQueryParams'
import AsideFilter from './AsideFilter'
import Product from './Product/Product'
import SortProductList from './SortProductList'
import { useQuery } from '@tanstack/react-query'
import productApi from '~/apis/product.apis'
import { useState } from 'react'
import Pagination from '~/Components/Pagination'

export default function ProductList() {
  const queryParams = useQueryParams()
  const { data } = useQuery({
    queryKey: ['product', queryParams],
    queryFn: () => {
      return productApi.getProducts(queryParams)
    }
  })
  const [page, setPage] = useState(1)
  console.log(data)
  return (
    <div className='py-6 bg-gray-200'>
      <div className='max-w-7xl mx-auto px-4'>
        <div className='grid grid-cols-12 gap-6'>
          <div className='col-span-3'>
            <AsideFilter />
          </div>
          <div className='col-span-9'>
            <SortProductList />
            <div className='mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3'>
              {data &&
                data.data.data.products.map((product) => (
                  <div className='col-span-1' key={product._id}>
                    <Product product={product} />
                  </div>
                ))}
            </div>
          </div>
        </div>
        <Pagination page={page} setPage={setPage} pageSize={20} />
      </div>
    </div>
  )
}
