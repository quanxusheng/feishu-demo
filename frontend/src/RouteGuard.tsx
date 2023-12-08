import { Outlet, useNavigate, useLocation, redirect } from 'react-router-dom'
import { useEffect } from 'react'
import { MantineProvider } from '@mantine/core'
import useTheme from './layout/TableLayout/components/Header/components/UserCenterDropdown/Hooks/useTheme'

// import useUserWork from '@/hooks/useUserWorker'
import useUserInfo from './hooks/useUserInfo'

export default function RouteGuard() {
    const { realtimeTheme } = useTheme()
    const navigate = useNavigate()
    const location = useLocation()
    const { user } = useUserInfo()
    console.log('=>99999999999999999', user)

    // const localUserId = localStorage.getItem('userId')
    console.log(111)

    useEffect(() => {
        console.log(2222)
        // console.log('=>location.pathname', location)
        // const localUserId = localStorage.getItem('userId')
        // if (!user || !user.userId || !localUserId) {
        //     if (location.pathname !== '/login') {
        //         navigate('/login')
        //     }
        // }
        // else
        if (location.pathname.startsWith('/base')) {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'))
            const { sheetData } = userInfo

            console.log('=>userInfo', userInfo)
            navigate(`/base/${sheetData.id}?tableId=${sheetData.tableList[0].id}`)
        }
    }, [location, navigate, user])

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