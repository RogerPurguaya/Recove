'use strict'

const mongoose   = require('mongoose')
const app = require('./app')
const config = require('./config')
//>>>>>>>>> Sockets >>>>>>>>>>
const http = require('http')
const socketIO = require('socket.io')
const client =  require('socket.io-client')
const server = http.createServer(app)
const io = socketIO(server)
//const startSockets = require('./chat/sockets')
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

//conexión a mongoDB:
mongoose.connect(config.db, (err, res) => {
    if(err) throw err;
    console.log('Conexión a la base de datos correcta.')
})

//Poner a la escucha el server:
server.listen(config.port, () => {
    console.log(`app corriendo en http:${config.port}`)
})

//Poner a la escucha los sockets:
//startSockets(io)

io.on('connection' , (socket) => {
    socket.on('new-publicacion' , (publicacion) => {
        /*console.log(`el socket ${socket.id} ha mandado: ${publicacion}`)*/
        socket.broadcast.emit('new-notification', {publicacion})
    })
}) 

