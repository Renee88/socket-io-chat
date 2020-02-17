import React from 'react';
import Friend from '../Friend/Friend'
import './Friends.css'

const Friends = ({ users, currUser, inviteToPrivateRoom, socket, setFriend}) => {
    return (
        <div className="users-container">
            {users.map((friend, i) => <Friend key={i} friend={friend} socket = {socket} currUser={currUser} inviteToPrivateRoom = {inviteToPrivateRoom} setFriend = {setFriend}/>)}
        </div>
    );
};

export default Friends;