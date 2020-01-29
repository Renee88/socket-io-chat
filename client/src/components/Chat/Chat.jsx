import React, { useEffect } from 'react';
import queryString from 'query-string'
import io from 'socket.io-client'
import './Chat.css'
import InfoBar from '../InfoBar/InfoBar'
import Input from '../Input/Input'
import Messages from '../Messages/Messages'

let socket

const Chat = ({ location }) => {

    const [name, setName] = React.useState('')
    const [room, setRoom] = React.useState('')
    const [message, setMessage] = React.useState('')
    const [messages, setMessages] = React.useState([])
    const endpoint = 'localhost:5000'


    useEffect(() => {
        const { name, room } = queryString.parse(location.search)

        socket = io(endpoint)
        setName(name)
        setRoom(room)

        socket.emit('join', { name, room }, () => {

        })

        return () => {
            socket.emit('disconnect')
            socket.off()
        }

    }, [endpoint, location.search])

    useEffect(() => {
        socket.on('message', (message) => {
            setMessages([...messages, message])
        })
    }, [messages])

    const sendMessage = event => {
        event.preventDefault()
        if (message) {
            socket.emit('sendMessage', message, () => setMessage(''))
        }
    }

    console.log(message, messages)

    return (
        <div className="outer-container">
            <InfoBar room={room} />
            <div className="chat-container">
                <Messages messages={messages} name={name} />
            </div>
            <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
        </div>
    );
};

export default Chat;

