import { Box, Paper, TextInput, Button, Group, Center, Container, Text } from '@mantine/core'
import { useForm } from '@mantine/form'
import { randomId } from '@mantine/hooks'

import { useNavigate } from 'react-router-dom'

import axios from 'axios'
export default function Login() {

    const to = useNavigate()

    const mForm = useForm({
        initialValues: {
            name: '',
            email: '',
        },
        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email')
        }
    })

    const arr = ['林国瑞', '林玟书', '林雅南', '江奕云', '刘柏宏', '阮建安', '夏志豪', '吉茹定', '黄文隆', '林子帆']

    const handleLogin = async () => {
        // mForm.setValues({
        //     name: arr[(Math.random() * 10).toFixed()],
        //     email: `${randomId()}@test.com`
        // })
        const params = {
            username: arr[(Math.random() * 10).toFixed()],
            email: `${randomId()}@test.com`
        }
        axios.post('/login', params)
            .then(res => {
                console.log('=>', res)
                console.log('=>ddd', res.data)
                if (res.data.code === '200') {
                    // to('/base/')
                }
            })
    }
    return (
        <Center style={{ height: '100vh' }}>
            <Box >
                <Paper shadow='md' className='p-10'>
                    <form>
                        <TextInput
                            label="Name"
                            required
                            {...mForm.getInputProps('name')}
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