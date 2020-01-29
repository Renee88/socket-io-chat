import React from 'react';
import './Input.css'
const Input = ({ message, setMessage, sendMessage }) => {
    return (
        <div className="input-container">
            <input
                value={message}
                onChange={(event) => { setMessage(event.target.value) }}
                onKeyPress={(event) => event.key === 'Enter' ? sendMessage(event) : null}
            />
            <div className="send" onClick={sendMessage}>Send</div>
        </div>
    );
};

export default Input;