import { createBrowserRouter } from 'react-router-dom'
import {lazy} from 'react'
import RouteGuard from './RouteGuard'


const Home = lazy(() => import('./pages/Home'))
const Login = lazy(() => import('./pages/Login'))
const routes = createBrowserRouter([
  {
    path: '/',
    element: <RouteGuard />,
    children: [
      {
        path: '/Home',
        element: <Home />
      },
      {
        path: '/login',
        element: <Login />
      }
    ]
  }
])

export default routes