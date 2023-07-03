import { io } from 'socket.io-client'

const url = 'http://localhost:8999'

const socket = io(url)
// console.log('=>sss', socket)
export default socket