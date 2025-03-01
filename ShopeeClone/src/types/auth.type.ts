import { User } from './user.type'
import { ResponseApi } from './utils.type'

export type AuthResponse = ResponseApi<{
  access_token: string
  expires: string
  refresh_token: string
  expires_refresh_token: string
  user: User
}>
