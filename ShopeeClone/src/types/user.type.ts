export type Role = 'Admin' | 'User'
export type User = {
  roles: Role[]
  _id: string
  email: string
  createdAt: string
  updatedAt: string
}
