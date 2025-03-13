import useQueryParams from '~/hooks/useQueryParams'
import AsideFilter from './AsideFilter'
import Product from './Product/Product'
import SortProductList from './SortProductList'
import { useQuery } from '@tanstack/react-query'
import productApi from '~/apis/product.apis'
import Pagination from '~/Components/Pagination'
import { ProductListConfig } from '~/types/product.type'
import { omitBy, isUndefined } from 'lodash'
import categoryApi from '~/apis/categories.api'

export type QueryConfig = {
  [key in keyof ProductListConfig]: string
}
export default function ProductList() {
  const queryParams: QueryConfig = useQueryParams()
  const queryConfig: QueryConfig = omitBy(
    {
      page: queryParams.page || '1',
      category: queryParams.category,
      exclude: queryParams.exclude,
      limit: queryParams.limit || '30',
      name: queryParams.name,
      order: queryParams.order,
      price_max: queryParams.price_max,
      price_min: queryParams.price_min,
      rating_filter: queryParams.rating_filter,
      sort_by: queryParams.sort_by
    },
    isUndefined
  )
  console.log('queryConfig', queryConfig)
  const { data: ProductData } = useQuery({
    queryKey: ['product', queryParams],
    queryFn: () => {
      return productApi.getProducts(queryConfig as ProductListConfig)
    },
    keepPreviousData: true
  })

  const { data: CategoryData } = useQuery({
    queryKey: ['categories'],
    queryFn: () => {
      return categoryApi.getCategories()
    }
  })
  console.log(ProductData)
  return (
    <div className='py-6 bg-gray-200'>
      <div className='max-w-7xl mx-auto px-4'>
        {ProductData && (
          <div>
            <div className='grid grid-cols-12 gap-6'>
              <div className='col-span-3'>
                <AsideFilter categories={CategoryData?.data.data || []} queryConfig={queryConfig} />
              </div>
              <div className='col-span-9'>
                <SortProductList queryConfig={queryConfig} pageSize={ProductData.data.data.pagination.page_size} />
                <div className='mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3'>
                  {ProductData.data.data.products.map((product) => (
                    <div className='col-span-1' key={product._id}>
                      <Product product={product} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <Pagination queryConfig={queryConfig} pageSize={ProductData.data.data.pagination.page_size} />
          </div>
        )}
      </div>
    </div>
  )
}
