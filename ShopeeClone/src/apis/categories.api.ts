import http from '~/utils/http'
import { SuccessResponseApi } from '~/types/utils.type'
import { Category } from '~/types/categories.type'

const URL = 'categories'

const categoryApi = {
  getCategories() {
    return http.get<SuccessResponseApi<Category[]>>(URL)
  }
}
export default categoryApi
