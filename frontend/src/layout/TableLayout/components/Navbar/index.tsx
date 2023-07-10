import { Box, Navbar as NavbarContainer, ActionIcon, Text, Divider, Input } from '@mantine/core'
import { map } from 'lodash-es'
import { IconDots, IconPlus } from '@tabler/icons-react'
import { useCallback, useState, useRef } from 'react'

import useSheets from '../../../../hooks/useSheets'


export default function Navbar() {
    const [showCreateSheetInput, setShowCreateSheetInput] = useState<boolean>(false)
    const inputRef = useRef<HTMLInputElement>()

    const { sheetsArr, createSheetDispatcher } = useSheets()
    // console.log('=>sheets', sheetsArr)
    // createSheetDispatcher()
    const handleCreateSheet = useCallback(() => {
        setShowCreateSheetInput(true)
        console.log('=>inputRef', inputRef)
        requestIdleCallback((e) => {
            // console.log('=>eeee', e)
            // console.log('=>inputRef222', inputRef)
            inputRef.current.focus()
        })
        // createSheetDispatcher()
    }, [])

    const requestCreateSheet = useCallback(() => {
        setShowCreateSheetInput(false)
        createSheetDispatcher(inputRef.current.value)
    }, [createSheetDispatcher])
    return (
        <NavbarContainer w={280}>
            <Box className="w-full h-full relative p-2">
                {/* list模块 */}
                <Box className='p-2'>
                    {
                        map(sheetsArr, item => {
                            return (
                                <Box
                                    key={item.id}
                                    className='flex cursor-pointer h-9 justify-between px-1 items-center rounded hover:bg-slate-200'
                                >
                                    <Text>{item.name}</Text>
                                    <ActionIcon>
                                        <IconDots size={14} />
                                    </ActionIcon>
                                </Box>

                            )
                        })

                    }
                    {
                        showCreateSheetInput && <Input defaultValue={'数据表'} onBlur={requestCreateSheet} ref={inputRef} />
                    }
                </Box>

                {/* 操作模块 */}
                <Box style={{ width: `calc(100% - 16px)` }} className="absolute bottom-0 px-3 pb-4">
                    <Divider />
                    <Text color="#646A73" className="text-sm h-8 pt-2 flex items-center mb-2">新建</Text>
                    <Box onClick={handleCreateSheet} className="flex justify-between h-9 items-center cursor-pointer px-2 rounded hover:bg-slate-200">
                        <Box style={{ color: "#a45eeb" }} className="flex items-center gap-1">
                            <Text className="text-sm text-black">新建数据表</Text>
                        </Box>
                        <IconPlus size={16} />
                    </Box>
                </Box>
            </Box>
        </NavbarContainer>
    )
}