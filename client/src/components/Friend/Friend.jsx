import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
import PrivateInvitation from '../PrivateInvitation/PrivateInvitation'
import 'antd/dist/antd.css';
import './Friend.css'

const Friend = ({ friend: { name, image, id }, currUser, inviteToPrivateRoom, socket, setFriend }) => {
    let isCurrentUser = false
    const {currId, currName} = currUser
    let trimmedName = currName.trim().toLowerCase()

    if (name === trimmedName) {
        isCurrentUser = true
    }



    return (
        !isCurrentUser
            ? <div className="user-container user">
                <div className="user-name-avatar">
                    <img src={image} className="small"></img>
                    <p className="user-in-room">{name}</p>
                </div>
                <Button type="primary" onClick={() => {
                    console.log(id)
                    setFriend({ id, name })
                    inviteToPrivateRoom({ friend: { id, name }, currUser, socket })
                }}> Private Chat </Button>
            </div>
            : <div className="curr-user-container user">
                <img src={image} className="large"></img>
                <p className="user-in-room">{name}</p>
            </div>
    );
};

export default Friend;