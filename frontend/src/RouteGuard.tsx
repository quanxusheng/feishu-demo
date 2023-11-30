import { Outlet, useNavigate, useLocation, redirect } from 'react-router-dom'
import { useEffect } from 'react'
import { MantineProvider } from '@mantine/core'
import useTheme from './layout/TableLayout/components/Header/components/UserCenterDropdown/Hooks/useTheme'

export default function RouteGuard() {
    const { realtimeTheme } = useTheme()
    const navigate = useNavigate()
    const location = useLocation()
    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'))
        const { userId, sheetData } = userInfo
        // console.log('=>location.pathname', location)
        // console.log('=>location.pathname', location.pathname)

        // if (!userId && location.pathname !== '/login') {
        if (!userId) {
            if (location.pathname !== '/login') {
                navigate('/login')
            }
        }
        else {
            if (!location.pathname.startsWith('/base')) {
                navigate(`/base/${sheetData.id}?tableId=${sheetData.tableList[0].id}`)
            }
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