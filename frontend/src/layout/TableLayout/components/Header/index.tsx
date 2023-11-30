import { Box, Header as HeaderContainer, Button, Avatar, Menu, Text, Card, Flex } from '@mantine/core'
import UserCenterDropdown from './components/UserCenterDropdown'
import useUserWorker from '../../../../hooks/useUserWorker'

import { useCallback } from 'react'

import useWorkInProgressWorker from '@/hooks/useWorkInProgressRoomWorker'
import { map } from 'lodash-es'


export default function Header() {
    const { roomInfo } = useWorkInProgressWorker()
    const { user } = useUserWorker()
    // const len = username.length
    // const name = len > 2 ? username.slice(len - 2, len) : username
    // console.log('=>roomInfo', roomInfo)
    console.log('=>roomInfo', user)
    // console.log('=>roomInfo.onlineUsers', roomInfo.onlineUsers)

    return (
        <HeaderContainer
            height={86}
        >
            <Box className=' h-full flex justify-between p-4'>
                <Text style={{ fontSize: '50px' }} fz='xl' fw='bold' c='blue' >远智教育</Text>

                <Card withBorder shadow='lg' padding='lg' className='w-6/12'>
                    <Card.Section>
                        <Flex>
                            {
                                map(roomInfo.onlineUsers, item => {
                                    return (
                                        <Box key={item.userId}>
                                            <Avatar src={item.avatar} radius="xl" size='sm' alt="it's me" />
                                            <Text >{item.username}</Text>
                                        </Box>
                                    )
                                })
                            }
                        </Flex>
                    </Card.Section>
                </Card>


                {/* <Button color="transparent" className='bg-blue-500'>click</Button> */}

                <Menu>
                    <Menu.Target>
                        <Avatar src={user.avatar} className='cursor-pointer' radius='xl' color="blue"></Avatar>
                    </Menu.Target>

                    <Menu.Dropdown>
                        <UserCenterDropdown />
                    </Menu.Dropdown>
                </Menu>
            </Box>
        </HeaderContainer>
    )
}