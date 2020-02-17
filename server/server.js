const express = require('express')
const socketio = require('socket.io')
const http = require('http')

const { addUser, removeUser, getUser, getUsersInRoom } = require('./users')

const PORT = process.env.PORT || 5000

const router = require('./api')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

io.on('connection', (socket) => {
    console.log('We have a new connection!!!')

    socket.on('join', ({ name, room, image }, callback) => {
        const { error, user } = addUser({ id: socket.id, name, room, image })

        if (error) return callback(error)

        socket.emit('message', { user: 'admin', text: `${user.name}, welcome to the room ${user.room}` })
        socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!` })
        socket.join(user.room)

        io.to(user.room).emit('roomData', { users: getUsersInRoom(user.room) })

        callback()
    })

    socket.on('sendMessage', (message, callback) => {
        const { user, error } = getUser(socket.id)
        io.to(user.room).emit('message', { user: user.name, text: message })
        io.to(user.room).emit('roomData', { users: getUsersInRoom(user.room) })
        callback()
    })

    socket.on('private', ({ currUser, friend }) => {
        const { id, name } = friend
        io.to(`${id}`).emit('invite', { invitingUser: currUser, invitedUser: friend })
    })


    socket.on('disconnect', () => {
        let user = removeUser(socket.id)
        if (user) {
            io.to(user.room).emit('message', { user: 'admin', text: `${user.name} has left.` })
            io.to(user.room).emit('roomData', { users: getUsersInRoom(user.room) })
        }

        console.log('Client disconnected!!!')
    })
})

app.use(router)

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

