import React from 'react';
import {Link} from 'react-router-dom'
import './InfoBar.css'

const InfoBar = ({ room }) => {
    return (
        <div className="infobar-container">
            <div className="left-inner-container">
                <div className="online" ><i className="fas fa-circle"></i></div>
                <div className="room-name">{room}</div>
            </div>
            <div className="right-inner-container">
                <Link to="/" className="close"><i className="fas fa-times"></i></Link>
            </div>

        </div>
    );
};

export default InfoBar;