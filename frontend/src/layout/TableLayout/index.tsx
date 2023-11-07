import { AppShell, Box, Button } from '@mantine/core';
import { PropsWithChildren, useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import useSocket from '../../socket/hooks/useSocket'

import { modifyUserInfo } from '../../store/slicers/userSlice'
import { RootState, store } from '../../store'
import useUserWorker from '../../hooks/useUserWorker';

import Header from './components/Header'
import Navbar from './components/Navbar'

// import { openDB } from 'idb'


export default function TableLayout(props: PropsWithChildren) {
    useSocket()

    // const initialDB = async () => {
    //     const db = await openDB('sheet-db')
    //     console.log('=>db', db)
    // }
    // initialDB()

    return (
        <AppShell
            header={<Header />}
            navbar={<Navbar />}
        >
            <Box pl={280}>
                {props.children}
            </Box>
        </AppShell>
    )
}