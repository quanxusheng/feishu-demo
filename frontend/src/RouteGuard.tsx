import { Outlet, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { MantineProvider } from '@mantine/core'
import useTheme from './layout/TableLayout/components/Header/components/UserCenterDropdown/Hooks/useTheme'

export default function RouteGuard() {
    const { realtimeTheme } = useTheme()
    // const navigate = useNavigate()
    // useEffect(() => {
    //   if (true) {
    //     navigate('/login')
    //   }
    // }, [navigate])
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