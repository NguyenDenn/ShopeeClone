import axios, { AxiosError, AxiosInstance } from 'axios'
import { toast } from 'react-toastify'
import HttpStatusCode from '~/constants/httpStatusCode.enum'
import { AuthResponse } from '~/types/auth.type'
import { clearAccessTokenFromLS, getAccessTokenFromLS, SaveAccessTokenToLS } from './auth'

class Http {
  instance: AxiosInstance
  private accessToken: string

  constructor() {
    // khai bao bien this.accessToken = getaccessTokenFromLS
    this.accessToken = getAccessTokenFromLS()
    this.instance = axios.create({
      baseURL: 'https://api-ecom.duthanhduoc.com/',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    this.instance.interceptors.request.use(
      (config) => {
        if (this.accessToken && config.headers) {
          config.headers.Authorization = this.accessToken
          return config
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )
    this.instance.interceptors.response.use(
      (response) => {
        console.log(response)
        const { url } = response.config
        // neu url login or register thi lay access token va luu vao ls
        if (url === '/login' || url === '/register') {
          this.accessToken = (response.data as AuthResponse).data.access_token
          SaveAccessTokenToLS(this.accessToken)
          // nguoc lai neu url logout thi clear access token
        } else if (url === '/logout') {
          clearAccessTokenFromLS()
        }
        return response
      },
      function (error: AxiosError) {
        if (error.response?.status !== HttpStatusCode.UnprocessableEntity) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const data: any | undefined = error.response?.data
          const message = data.message || error.message
          toast.error(message)
        }
        return Promise.reject(error)
      }
    )
  }
}
const http = new Http().instance
export default http
