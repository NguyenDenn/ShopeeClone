import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import ProductList from './Pages/ProductList'
import Login from './Pages/Login'
import RegisterLayout from './Layouts/RegisterLayout'
import Register from './Pages/Register'
import MainLayout from './Layouts/MainLayout/MainLayout'
import Profile from './Pages/Profile'
import { useContext } from 'react'
import { AppContext } from './context/app.context'
import ProductDetail from './Pages/ProductDetail'
import path from './constants/path'
import Cart from './Pages/Cart'

export default function RouteElement() {
  const { isAuthenticated } = useContext(AppContext)
  function ProtectedRoute() {
    return isAuthenticated ? <Outlet /> : <Navigate to='/login' />
  }
  function RejectedRoute() {
    return !isAuthenticated ? <Outlet /> : <Navigate to='/' />
  }
  const routeElement = useRoutes([
    {
      path: '/',
      element: <ProtectedRoute />,
      children: [
        {
          path: path.profile,
          element: (
            <MainLayout>
              <Profile />
            </MainLayout>
          )
        },
        {
          path: path.cart,
          element: (
            <MainLayout>
              <Cart />
            </MainLayout>
          )
        }
      ]
    },

    {
      path: '',
      element: <RejectedRoute />,
      children: [
        {
          path: path.login,
          element: (
            <RegisterLayout>
              <Login />
            </RegisterLayout>
          )
        },
        {
          path: path.register,
          element: (
            <RegisterLayout>
              <Register />
            </RegisterLayout>
          )
        }
      ]
    },
    {
      path: path.home,
      index: true,
      element: (
        <MainLayout>
          <ProductList />
        </MainLayout>
      )
    },
    {
      path: path.productDetail,
      index: true,
      element: (
        <MainLayout>
          <ProductDetail />
        </MainLayout>
      )
    }
  ])
  return routeElement
}
