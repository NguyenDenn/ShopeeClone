import { Product, ProductList, ProductListConfig } from '~/types/product.type'
import { SuccessResponseApi } from '~/types/utils.type'
import http from '~/utils/http'

const URL = 'products'
const productApi = {
  getProducts(params: ProductListConfig) {
    return http.get<SuccessResponseApi<ProductList>>(URL, {
      params
    })
  },
  getProductDetails(id: string) {
    return http.get<SuccessResponseApi<Product>>(`${URL}/${id}`)
  }
}
export default productApi
