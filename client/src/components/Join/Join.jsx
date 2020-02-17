import React from 'react';
import Images from '../Images/Images'
import { Link } from 'react-router-dom'

import './Join.css'

const Join = () => {

    const [name, setName] = React.useState('')
    const [room, setRoom] = React.useState('')
    const [currImageId,setImageId] = React.useState(1)

    return (
        <div className="join-outer-container">
            <div className="join-inner-container">
                <h1 className="heading">Join</h1>
                <div><input placeholder="Name" className="join-input" type="text" onChange={(e) => setName(e.target.value)} /></div>
                <div><input placeholder="Room" className="join-input mt-20" type="text" onChange={(e) => setRoom(e.target.value)} /></div>
                <p>What's your avatar?</p>
                <Images path ={'/avatars'} setImageId={setImageId} currImageId={currImageId}/>
                <Link onClick = {!name||!room ? (e) => (
                    e.preventDefault()
                    ): null} to = {`/chat?name=${name}&room=${room}&imageId=${currImageId}`}>
                    <div className="button mt-20" type="submit">Sign In</div>
                </Link>
            </div>
        </div>
    );
};

export default Join;