import { useRoutes } from 'react-router-dom'
import ProductList from './Pages/ProductList'
import Login from './Pages/Login'
import RegisterLayout from './Layouts/RegisterLayout'
import Register from './Pages/Register'
import MainLayout from './Layouts/MainLayout/MainLayout'

export default function RouteElement() {
  const routeElement = useRoutes([
    {
      path: '/',
      element: (
        <MainLayout>
          <ProductList />
        </MainLayout>
      )
    },
    {
      path: '/login',
      element: (
        <RegisterLayout>
          <Login />
        </RegisterLayout>
      )
    },
    {
      path: '/register',
      element: (
        <RegisterLayout>
          <Register />
        </RegisterLayout>
      )
    }
  ])
  return routeElement
}
