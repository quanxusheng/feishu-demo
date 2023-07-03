import { AppShell, Box, Button } from '@mantine/core';
import { PropsWithChildren, useEffect } from 'react'
import useSocket from '../../socket/hooks/useSocket'

import Header from './components/Header'
import Navbar from './components/Navbar'


export default function TableLayout(props: PropsWithChildren) {
    const { submitNewVersion } = useSocket()

    return (
        <AppShell
            header={<Header />}
            navbar={<Navbar />}
        >
            <Box pl={280}>
                {props.children}
                <Button onClick={submitNewVersion} className='bg-blue-500'>submit</Button>
            </Box>
        </AppShell>
    )
}