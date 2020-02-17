import React, { useEffect, useState } from 'react';
import Image from '../Image/Image'
import './Images.css'
const Images = ({ path, setImageId , currImageId}) => {


    const makeImageList = function () {
        let images = []
        for (let i = 1; i < 51; i++) {
            i < 10 ? images.push(`${path}/Avatars Set Flat Style-0${i}.png`) : images.push(`${path}/Avatars Set Flat Style-${i}.png`)
        }
        return images
    }


    return (
        <div className="avatars">
            {makeImageList().map((image, i) => <Image key={i} source={image} currImageId={currImageId} id={i + 1} setImageId={setImageId} />)}
        </div>

    );
};

export default Images;