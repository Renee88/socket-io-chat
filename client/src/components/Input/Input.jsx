import React from 'react';
import './Input.css'
const Input = ({ message, setMessage, sendMessage }) => {
    return (
        <div className="input-container">
            <input
                value={message}
                placeholder="Type your message here..."
                onChange={(event) => { setMessage(event.target.value) }}
                onKeyPress={(event) => event.key === 'Enter' ? sendMessage(event) : null}
                className="message-input"
            />
            <div className="send" onClick={sendMessage}><i className="fas fa-paper-plane"></i></div>
        </div>
    );
};

export default Input;