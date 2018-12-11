function startSockets(io) {
    io.on('connection' , (socket) => {
        socket.on('new-publicacion' , (publicacion) => {
        	//socket.broadcast.emit('show-publicacion', {publicacion})
        	console.log(publicacion)
            /* socket.broadcast.emit('new-notification', {publicacion}) */
        })
    }) 
}

module.exports = startSockets