import React from 'react';
import './Image.css'

const Image = ({ source, id, setImageId, currImageId }) => {
    return (
        <div className="user-avatar" id={id} onClick={() => {
            document.getElementById(`${currImageId}`).style.borderColor = "#222222"
            setImageId(id)
            document.getElementById(`${id}`).style.borderColor = "royalblue"
        }}>
            <img src={source}></img>
        </div>

    );
};

export default Image;