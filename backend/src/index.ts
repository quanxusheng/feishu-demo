import Koa from 'koa'
import { createServer } from 'http'
import { Server } from 'socket.io'
import bodyParser from 'koa-bodyparser'
import routesInstaller from './routes'

const app = new Koa()
const server = createServer(app.callback())

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000'
  }
})

io.on('connection', socket => {
//   console.log('=>socket-连上了', socket)
  socket.on('message', message => {
    console.log('=> 客户端发版本过来了', message)
    socket.emit('message', message)
  })
})

server.listen(8999, () => {
  console.log('=>', 'socket 8999')
})

let port = 8080
app.use(bodyParser())

routesInstaller(app)

app.listen(port, () => {
  console.log('=>listen', 'success')
})
