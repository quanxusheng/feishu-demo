import { Box, Header as HeaderContainer, Button, Avatar, Menu, Text } from '@mantine/core'
import UserCenterDropdown from './components/UserCenterDropdown'
import useUserWorker from '../../../../hooks/useUserWorker'

import { useCallback } from 'react'


export default function Header() {

    return (
        <HeaderContainer
            height={86}
        >
            <Box className=' h-full flex justify-between p-4'>
                <Text style={{ fontSize: '50px' }} fz='xl' fw='bold' c='blue' >远智教育</Text>
                {/* <Button color="transparent" className='bg-blue-500'>click</Button> */}

                <Menu>
                    <Menu.Target>
                        <Avatar className='cursor-pointer' radius='xl' color="blue">鲸鱼</Avatar>
                    </Menu.Target>

                    <Menu.Dropdown>
                        <UserCenterDropdown />
                    </Menu.Dropdown>
                </Menu>
            </Box>
        </HeaderContainer>
    )
}