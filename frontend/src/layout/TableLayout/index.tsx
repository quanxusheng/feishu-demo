import { AppShell, Box, Button } from '@mantine/core';
import { PropsWithChildren, useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import useSocket from '../../socket/hooks/useSocket'

import { modifyUserInfo } from '../../store/slicers/userSlice'
import { RootState, store } from '../../store'
import useUserWorker from '../../hooks/useUserWorker';

import Header from './components/Header'
import Navbar from './components/Navbar'


export default function TableLayout(props: PropsWithChildren) {

    const { submitNewVersion } = useSocket()
    const { user, modify } = useUserWorker()
    // console.log('=>useruser', user)

    // const storeData = store.getState()
    // console.log('=>name', storeData)

    const handleClick = useCallback(() => {
        const key = Math.random().toFixed(9)
        modify(
            {
                username: 'sss' + key,
                userId: key
            }
        )

        submitNewVersion()
    }, [modify, submitNewVersion])



    return (
        <AppShell
            header={<Header />}
            navbar={<Navbar />}
        >
            <Box pl={280}>
                {props.children}
                <Button onClick={handleClick} className='bg-blue-500'>submit - {user.username}</Button>
                <Button onClick={handleClick} className='bg-blue-500'>submit - {user.userId}</Button>
            </Box>
        </AppShell>
    )
}