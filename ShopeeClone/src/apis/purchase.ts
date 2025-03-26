import { Purchase, PurchaseListStatus } from '~/types/purchase.type'
import { SuccessResponseApi } from '~/types/utils.type'
import http from '~/utils/http'

const URL = 'purchases'
const purchaseApi = {
  addToCart(body: { product_id: string; buy_count: number }) {
    return http.post<SuccessResponseApi<Purchase>>(`${URL}/add-to-cart`, body)
  },
  getPurchase(params: { status: PurchaseListStatus }) {
    return http.get<SuccessResponseApi<Purchase[]>>(`${URL}`, {
      params
    })
  }
}
export default purchaseApi
