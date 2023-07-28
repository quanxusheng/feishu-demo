import { createBrowserRouter } from 'react-router-dom'
import { lazy } from 'react'
import RouteGuard from './RouteGuard'


const Sheet = lazy(() => import('./pages/Sheet/index'))
const Login = lazy(() => import('./pages/Login'))
const routes = createBrowserRouter([
    {
        path: '/',
        element: <RouteGuard />,

        children: [
            {
                path: '/base/:roomId/:sheetId/:viewId',
                element: <Sheet />
            },
            {
                path: '/login',
                element: <Login />
            }
        ]
    }
])

export default routes