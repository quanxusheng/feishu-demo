import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { MantineProvider } from '@mantine/core'
import useTheme from './layout/TableLayout/components/Header/components/UserCenterDropdown/Hooks/useTheme'

export default function RouteGuard() {
    const { realtimeTheme } = useTheme()
    const navigate = useNavigate()
    const location = useLocation()
    // console.log('=>llll', localStorage.getItem('userId'))
    // console.log('=>faker', faker.string.uuid())
    useEffect(() => {
        const userId = localStorage.getItem('userId')
        console.log('=>llll', userId)
        console.log('=>location.pathname', location.pathname)

        if (!userId && location.pathname !== '/login') {
            navigate('/login')
        }
    }, [location, navigate])

    return (
        <>
            {/* <div>{props.children}</div> */}

            <MantineProvider
                theme={{ colors: { 'transparent': ['transparent'] }, colorScheme: realtimeTheme }}
                withGlobalStyles withNormalizeCSS>
                <Outlet />
            </MantineProvider>
        </>
    )
}