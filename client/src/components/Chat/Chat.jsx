import React, { useEffect, useState } from 'react';
import queryString from 'query-string'
import io from 'socket.io-client'
import './Chat.css'
import InfoBar from '../InfoBar/InfoBar'
import Input from '../Input/Input'
import Messages from '../Messages/Messages'
import Friends from '../Friends/Friends';
import PrivateInvitation from '../PrivateInvitation/PrivateInvitation'


let socket

const Chat = ({ location }) => {

    const [currName, setName] = useState('')
    const [currId, setId] = useState('')
    const [users, setUsers] = useState([])
    const [room, setRoom] = useState('')
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])
    const [open, setOpen] = useState(false)
    const [friend, setFriend] = useState({})

    const endpoint = 'localhost:5000'

    useEffect(() => {
        const { name, room, imageId } = queryString.parse(location.search)
        socket = io(endpoint)
        let image = imageId < 10 ? `/avatars/Avatars Set Flat Style-0${imageId}.png` : `/avatars/Avatars Set Flat Style-${imageId}.png`
        setName(name)
        setRoom(room)
        socket.emit('join', { name, room, image }, () => {

        })

        return () => {
            socket.emit('disconnect')
            socket.off()
        }

    }, [endpoint, location.search])

    useEffect(() => {
        setId(socket.id)
        socket.on('message', (message) => {
            setMessages([...messages, message])
        })
        socket.on('roomData', ({ users }) => {
            setUsers([...users])
        })

    }, [messages])


    const sendMessage = event => {
        event.preventDefault()
        if (message) {
            socket.emit('sendMessage', message, () => setMessage(''))
        }
    }

    useEffect(() => {
        socket.on('invite', ({ invitingUser, invitedUser }) => {
            const { currId, currName } = invitingUser
            invitingUser = { id: currId, name: currName }
            setFriend(invitingUser)
            setOpen(true)
        })
    }, [friend])

    const inviteToPrivateRoom = ({ friend, currUser, socket }) => {
        setFriend(friend)
        socket.emit('private', { friend, currUser })
    }

    const handleOk = e => {
        setOpen(false)
    };

    const handleCancel = e => {
        setOpen(false)
    };




    return (
        <div className="outer-container">
            <InfoBar room={room} />
            <Friends users={users} currUser={{ currId, currName }} socket={socket} inviteToPrivateRoom={inviteToPrivateRoom} setFriend={setFriend} />
            <div className="chat-container">
                <Messages messages={messages} name={currName} />
                <PrivateInvitation open={open} handleOk={handleOk} handleCancel={handleCancel} friend={friend} currUser={{ currId, currName }} />
            </div>
            <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
        </div>
    );
};

export default Chat;

