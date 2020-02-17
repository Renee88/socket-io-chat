import React from 'react';
import ReactEmoji from 'react-emoji'
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
                <p className="message-text background-orange">{ReactEmoji.emojify(text)}</p>
            </div>
            : <div className={`message-box incoming`}>
                <p className="message-text background-light">{ReactEmoji.emojify(text)}</p>
                <span className="user-name">{user}</span>
            </div>
    )
};

export default Message;