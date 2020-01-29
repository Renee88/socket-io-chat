import React from 'react';
import './Message.css'

const Message = ({ message: { user, text }, name }) => {
    let isSentByCuurentUser = false
    let trimmedName = name.trim().toLowerCase()

    if (user === trimmedName) {
        isSentByCuurentUser = true
    }

    return (
        isSentByCuurentUser
            ? <div className={`message-box outgoing`}>
                <p className="message-text background-purple">{text}</p>
            </div>
            : <div className={`message-box incoming`}>
                <p className="message-text background-pink">{text}</p>
                <span className="user-name">{user}</span>
            </div>
    )
};

export default Message;