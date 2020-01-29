import React from 'react';
import './InfoBar.css'

const InfoBar = ({ room }) => {
    return (
        <div className="infobar-container">
            <div className="left-inner-container">
                <div className="online"><i class="fas fa-circle"></i></div>
                <div className="room-name">{room}</div>
            </div>
            <div className="right-inner-container">
                <div className="close"><i class="fas fa-times"></i></div>
            </div>

        </div>
    );
};

export default InfoBar;