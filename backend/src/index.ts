import Koa from 'koa'
import { createServer } from 'http'
import { Server } from 'socket.io'
import bodyParser from 'koa-bodyparser'
import routesInstaller from './routes'
import socketConnectionResolver from './socket'
import mongoose from 'mongoose'
// import './db'

const app = new Koa()
const server = createServer(app.callback())

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000'
  }
})

io.on('connection', socketConnectionResolver)

server.listen(8999, () => {
//   console.log('=>', 'socket 8999')
})

let port = 8080
app.use(bodyParser())

routesInstaller(app)

app.listen(port, () => {
//   console.log('=>listen', 'success')
})

mongoose.connect('mongodb://localhost:27017/sheetdb')
