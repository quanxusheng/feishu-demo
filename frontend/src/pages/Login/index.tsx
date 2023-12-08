import { Box, Paper, TextInput, Button, Group, Center, Container, Text } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useNavigate } from 'react-router-dom'
import { faker } from '@faker-js/faker'
import axios from 'axios'

import useUserWorker from '@/hooks/useUserWorker'
import useSheetDispatch from '@/store/hooks/useSheetDispatch'
// import useUserSheets from '@/hooks/useSheets'

export default function Login() {

    const to = useNavigate()

    const { userName, email } = faker.internet

    const { dispatchLogin } = useUserWorker()
    const { getOriginSheetsDataDispatcher } = useSheetDispatch()

    const mForm = useForm({
        initialValues: {
            username: userName(),
            email: email()
            // username: 'alex',
            // email: '466973739@qq.com'
        },
        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email')
        }
    })

    const handleLogin = async () => {
        axios.post('/login', mForm.values)
            .then(res => {
                // console.log('=>', res)
                const { code, data } = res.data
                if (code === 200) {
                    // 存储user
                    dispatchLogin(data)
                    localStorage.setItem('userId', data.userId)
                    localStorage.setItem('userInfo', JSON.stringify(data))

                    // 存储sheetData
                    const tempData = data.sheetData
                    getOriginSheetsDataDispatcher(tempData)
                    localStorage.setItem('sheetData', JSON.stringify(tempData))
                    // console.log('=>data-tempData', data)
                    // console.log('=>tempData', tempData)
                    const sheetId = tempData.id
                    const tabData = tempData.tableList[0]
                    to(`/base/${sheetId}?tableId=${tabData.id}`)
                }
            })
    }
    return (
        <Center style={{ height: '100vh' }}>
            <Box >
                <Paper shadow='md' className='p-10'>
                    <form>
                        <TextInput
                            label="Username"
                            required
                            {...mForm.getInputProps('username')}
                        />
                        <TextInput
                            label="Email"
                            required
                            {...mForm.getInputProps('email')}
                        />
                        <Group position='center'>
                            <Text onClick={handleLogin} bg='blue' color='white' className='rounded-lg px-3 py-1 mt-3 cursor-pointer select-none' >登录</Text>
                        </Group>
                    </form>

                </Paper>
            </Box>
        </Center>
    )
}