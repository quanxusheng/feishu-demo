import { Box, Header as HeaderContainer, Button, Avatar, Menu, Text, Card } from '@mantine/core'
import UserCenterDropdown from './components/UserCenterDropdown'
import useUserWorker from '../../../../hooks/useUserWorker'

import { useCallback } from 'react'

import useWorkInProgressWorker from '@/hooks/useWorkInProgressRoomWorker'
import { map } from 'lodash-es'

export default function Header() {

    const { roomInfo } = useWorkInProgressWorker()
    console.log('=>1111', roomInfo)
    console.log('=>2222', roomInfo.onlineUsers)

    return (
        <HeaderContainer
            height={86}
        >
            <Box className=' h-full flex justify-between p-4'>
                <Text style={{ fontSize: '50px' }} fz='xl' fw='bold' c='blue' >远智教育</Text>

                <Card withBorder shadow='lg' padding='lg' className='w-6/12'>
                    {/* <Card.Section>
                        {
                            map(roomInfo.onlineUsers, item => {
                                return <Box>{item.valueOf()}</Box>
                            })
                        }
                    </Card.Section> */}
                </Card>


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