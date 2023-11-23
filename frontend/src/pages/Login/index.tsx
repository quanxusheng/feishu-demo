import { Box, Paper, TextInput, Button, Group, Center, Container, Text } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useNavigate } from 'react-router-dom'
import { faker } from '@faker-js/faker'
import axios from 'axios'

import useUserWorker from '@/hooks/useUserWorker'

export default function Login() {

    const to = useNavigate()
    const { userName, email } = faker.internet

    const { login } = useUserWorker()

    const mForm = useForm({
        initialValues: {
            // username: userName(),
            // email: email()
            username: 'alex',
            email: '466973739@qq.com'
        },
        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email')
        }
    })

    const handleLogin = async () => {
        axios.post('/login', mForm.values)
            .then(res => {
                console.log('=>', res)
                const { code, data } = res.data
                if (code === 200) {
                    login(data)
                    // localStorage.setItem('userId', data.userId)
                    to('/base/aa/7d690de4-e9e5-43de-8721-6845e20527d7/07827929-4e3f-4f35-b5d9-17cee01a5cdf')
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