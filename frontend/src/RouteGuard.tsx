import { Outlet, useNavigate, useLocation, redirect } from 'react-router-dom'
import { useEffect } from 'react'
import { MantineProvider } from '@mantine/core'
import useTheme from './layout/TableLayout/components/Header/components/UserCenterDropdown/Hooks/useTheme'

// import useUserWork from '@/hooks/useUserWorker'
// import useUserInfo from './hooks/useUserInfo'

// import useSheet from '@/hooks/useSheet'

export default function RouteGuard() {
    const { realtimeTheme } = useTheme()
    const navigate = useNavigate()
    const location = useLocation()
    // const { user } = useUserInfo()
    // const { navigatorToTargetView } = useSheet()

    const localUserId = localStorage.getItem('userId')
    console.log('=>localUserId', localUserId)

    useEffect(() => {
        console.log('=>localUserId2222222', localUserId)
        if (!localUserId) {
            console.log('=>navigate', localUserId)
            navigate('/login')
            // return
        }
    }, [localUserId, navigate])
    // useEffect(() => {
    //     console.log('=>location.pathname', location)
    //     if (location.pathname.startsWith('/base')) {
    //         const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    //         const { sheetData } = userInfo

    //         console.log('=>sheetData111', sheetData)
    //         console.log('=>userInfo', userInfo)
    //         navigate(`/base/${sheetData.id}?tableId=${sheetData.tableList[0].id}`)
    //     }
    // }, [location, navigate])
    if (location.pathname.startsWith('/base')) {
        // navigatorToTargetView()
    }

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